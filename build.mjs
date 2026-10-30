import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of ['index.html','style.css','app.js','planner.js','scene.js','scene-model.js','scene.css','photo-scene.js','photo-scene.css','photo-hero.jpg','photo-canopy.jpg','photo-neighbourhood.jpg'])await copyFile(file,`dist/${file}`);

