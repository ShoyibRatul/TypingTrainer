import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ajv = new Ajv2020({ allErrors: true });
addFormats(ajv);

const schemasDir = path.resolve('schemas');
const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.schema.json'));

console.log(`Loading ${schemaFiles.length} JSON Schemas...`);
for (const file of schemaFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(schemasDir, file), 'utf-8'));
  ajv.addSchema(content, file);
}

const fixturesDir = path.resolve('test/fixtures/packs');
const packDirs = fs.readdirSync(fixturesDir);

let totalPassed = 0;
let totalFailed = 0;

for (const pack of packDirs) {
  const packPath = path.join(fixturesDir, pack);
  if (!fs.statSync(packPath).isDirectory()) continue;

  console.log(`\nValidating golden pack: ${pack}`);

  // Validate manifest
  const manifestPath = path.join(packPath, 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    const validate = ajv.getSchema('manifest.schema.json');
    const valid = validate(manifest);
    if (valid) {
      console.log(`  ✓ manifest.json is valid`);
      totalPassed++;
    } else {
      console.error(`  ✗ manifest.json invalid:`, validate.errors);
      totalFailed++;
    }
  }

  // Validate layouts
  const layoutsDir = path.join(packPath, 'layouts');
  if (fs.existsSync(layoutsDir)) {
    for (const lf of fs.readdirSync(layoutsDir)) {
      const layout = JSON.parse(fs.readFileSync(path.join(layoutsDir, lf), 'utf-8'));
      const validate = ajv.getSchema('layout.schema.json');
      const valid = validate(layout);
      if (valid) {
        console.log(`  ✓ layout ${lf} is valid`);
        totalPassed++;
      } else {
        console.error(`  ✗ layout ${lf} invalid:`, validate.errors);
        totalFailed++;
      }
    }
  }

  // Validate courses
  const coursesDir = path.join(packPath, 'courses');
  if (fs.existsSync(coursesDir)) {
    for (const c of fs.readdirSync(coursesDir)) {
      const coursePath = path.join(coursesDir, c);
      const courseFile = path.join(coursePath, 'course.json');
      if (fs.existsSync(courseFile)) {
        const course = JSON.parse(fs.readFileSync(courseFile, 'utf-8'));
        const validate = ajv.getSchema('course.schema.json');
        const valid = validate(course);
        if (valid) {
          console.log(`  ✓ course ${c}/course.json is valid`);
          totalPassed++;
        } else {
          console.error(`  ✗ course ${c}/course.json invalid:`, validate.errors);
          totalFailed++;
        }
      }

      const lessonsDir = path.join(coursePath, 'lessons');
      if (fs.existsSync(lessonsDir)) {
        for (const les of fs.readdirSync(lessonsDir)) {
          const lesson = JSON.parse(fs.readFileSync(path.join(lessonsDir, les), 'utf-8'));
          const validate = ajv.getSchema('lesson.schema.json');
          const valid = validate(lesson);
          if (valid) {
            console.log(`  ✓ lesson ${c}/lessons/${les} is valid`);
            totalPassed++;
          } else {
            console.error(`  ✗ lesson ${c}/lessons/${les} invalid:`, validate.errors);
            totalFailed++;
          }
        }
      }
    }
  }
}

console.log(`\nValidation complete: ${totalPassed} passed, ${totalFailed} failed.`);
if (totalFailed > 0) process.exit(1);
