require('dotenv').config();
const mongoose = require('mongoose');
const Challenge = require('./server/models/Challenge');

async function verificarEjercicios() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/js-playground', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado a MongoDB\n');

    const challenges = await Challenge.find().select('title difficulty points');
    
    console.log(`📝 Total de ejercicios en la base de datos: ${challenges.length}\n`);
    console.log('Lista de ejercicios:');
    console.log('='.repeat(60));
    
    challenges.forEach((challenge, index) => {
      console.log(`${index + 1}. ${challenge.title}`);
      console.log(`   Dificultad: ${challenge.difficulty} | Puntos: ${challenge.points}`);
      console.log(`   ID: ${challenge._id}`);
      console.log('');
    });

    // Buscar específicamente el ejercicio de isograma
    const isogramaChallenge = await Challenge.findOne({ title: 'Verificar Isograma' });
    
    if (isogramaChallenge) {
      console.log('✅ El ejercicio "Verificar Isograma" ESTÁ en la base de datos');
      console.log(`   ID: ${isogramaChallenge._id}`);
      console.log(`   Dificultad: ${isogramaChallenge.difficulty}`);
      console.log(`   Puntos: ${isogramaChallenge.points}`);
      console.log(`   Tests: ${isogramaChallenge.testCases.length}`);
    } else {
      console.log('❌ El ejercicio "Verificar Isograma" NO está en la base de datos');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verificarEjercicios();
