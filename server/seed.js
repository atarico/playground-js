require('dotenv').config();
const mongoose = require('mongoose');
const Challenge = require('./models/Challenge');
const User = require('./models/User');

// Retos de ejemplo
const sampleChallenges = [
  {
    title: 'Suma de Dos Números',
    description: `Escribe una función que reciba un array de dos números y retorne su suma.

Ejemplo:
- Input: [2, 3]
- Output: 5

La función debe llamarse "solution" y recibir el array como parámetro.`,
    difficulty: 'fácil',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es un array de dos números
  // Retorna la suma de ambos números
  
}`,
    testCases: [
      {
        input: '[2, 3]',
        expectedOutput: '5',
        description: 'Suma de números positivos'
      },
      {
        input: '[-1, 1]',
        expectedOutput: '0',
        description: 'Suma con números negativos'
      },
      {
        input: '[0, 0]',
        expectedOutput: '0',
        description: 'Suma de ceros'
      },
      {
        input: '[100, 200]',
        expectedOutput: '300',
        description: 'Suma de números grandes'
      }
    ],
    points: 100
  },
  {
    title: 'Invertir una Cadena',
    description: `Escribe una función que reciba una cadena de texto y la retorne invertida.

Ejemplo:
- Input: "hola"
- Output: "aloh"

La función debe llamarse "solution" y recibir la cadena como parámetro.`,
    difficulty: 'fácil',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es una cadena de texto
  // Retorna la cadena invertida
  
}`,
    testCases: [
      {
        input: '"hola"',
        expectedOutput: '"aloh"',
        description: 'Cadena simple'
      },
      {
        input: '"JavaScript"',
        expectedOutput: '"tpircSavaJ"',
        description: 'Cadena con mayúsculas'
      },
      {
        input: '"12345"',
        expectedOutput: '"54321"',
        description: 'Cadena numérica'
      },
      {
        input: '""',
        expectedOutput: '""',
        description: 'Cadena vacía'
      }
    ],
    points: 100
  },
  {
    title: 'Número Par o Impar',
    description: `Escribe una función que reciba un número y retorne "par" si es par o "impar" si es impar.

Ejemplo:
- Input: 4
- Output: "par"

- Input: 7
- Output: "impar"`,
    difficulty: 'fácil',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es un número
  // Retorna "par" o "impar"
  
}`,
    testCases: [
      {
        input: '4',
        expectedOutput: '"par"',
        description: 'Número par positivo'
      },
      {
        input: '7',
        expectedOutput: '"impar"',
        description: 'Número impar positivo'
      },
      {
        input: '0',
        expectedOutput: '"par"',
        description: 'Cero es par'
      },
      {
        input: '-3',
        expectedOutput: '"impar"',
        description: 'Número impar negativo'
      }
    ],
    points: 100
  },
  {
    title: 'Encontrar el Mayor',
    description: `Escribe una función que reciba un array de números y retorne el número mayor.

Ejemplo:
- Input: [3, 7, 2, 9, 1]
- Output: 9

La función debe llamarse "solution" y recibir el array como parámetro.`,
    difficulty: 'medio',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es un array de números
  // Retorna el número mayor
  
}`,
    testCases: [
      {
        input: '[3, 7, 2, 9, 1]',
        expectedOutput: '9',
        description: 'Array con números positivos'
      },
      {
        input: '[-5, -2, -10, -1]',
        expectedOutput: '-1',
        description: 'Array con números negativos'
      },
      {
        input: '[42]',
        expectedOutput: '42',
        description: 'Array con un solo elemento'
      },
      {
        input: '[5, 5, 5, 5]',
        expectedOutput: '5',
        description: 'Todos los números son iguales'
      }
    ],
    points: 150
  },
  {
    title: 'Contar Vocales',
    description: `Escribe una función que reciba una cadena de texto y retorne el número de vocales (a, e, i, o, u) que contiene.

Ejemplo:
- Input: "hola mundo"
- Output: 4

Considera tanto mayúsculas como minúsculas.

IMPORTANTE: Tu código debe ser eficiente para strings muy largos.`,
    difficulty: 'medio',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es una cadena de texto
  // Retorna el número de vocales
  
}`,
    timeLimit: 200, // 200ms - MUY estricto para detectar código lento
    memoryLimit: 128, // 128MB - límite de memoria
    strictOutput: true, // Output debe ser exacto
    testCases: [
      {
        input: '"hola mundo"',
        expectedOutput: '4',
        description: 'Cadena con espacios',
        weight: 1,
        isHidden: false
      },
      {
        input: '"JavaScript"',
        expectedOutput: '3',
        description: 'Cadena con mayúsculas',
        weight: 2,
        isHidden: false
      },
      {
        input: '"aeiou"',
        expectedOutput: '5',
        description: 'Solo vocales',
        weight: 1,
        isHidden: false
      },
      {
        input: '"xyz"',
        expectedOutput: '0',
        description: 'Sin vocales',
        weight: 1,
        isHidden: false
      },
      {
        input: '"' + 'abcdefghij'.repeat(50000) + '"', // String de 500,000 caracteres
        expectedOutput: '150000',
        description: 'Test de rendimiento - string muy largo',
        weight: 3,
        isHidden: true
      }
    ],
    points: 150
  },
  {
    title: 'Palíndromo',
    description: `Escribe una función que determine si una palabra es un palíndromo (se lee igual de izquierda a derecha que de derecha a izquierda).

Ejemplo:
- Input: "radar"
- Output: true

- Input: "hola"
- Output: false

Ignora mayúsculas y espacios.`,
    difficulty: 'medio',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es una cadena de texto
  // Retorna true si es palíndromo, false si no
  
}`,
    testCases: [
      {
        input: '"radar"',
        expectedOutput: 'true',
        description: 'Palíndromo simple'
      },
      {
        input: '"hola"',
        expectedOutput: 'false',
        description: 'No es palíndromo'
      },
      {
        input: '"anita lava la tina"',
        expectedOutput: 'true',
        description: 'Palíndromo con espacios'
      },
      {
        input: '"A man a plan a canal Panama"',
        expectedOutput: 'true',
        description: 'Palíndromo complejo'
      }
    ],
    points: 200
  },
  {
    title: 'FizzBuzz',
    description: `Escribe una función que reciba un número y retorne:
- "Fizz" si es divisible por 3
- "Buzz" si es divisible por 5
- "FizzBuzz" si es divisible por ambos
- El número como string si no es divisible por ninguno

Ejemplo:
- Input: 15
- Output: "FizzBuzz"

- Input: 7
- Output: "7"`,
    difficulty: 'medio',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es un número
  // Retorna "Fizz", "Buzz", "FizzBuzz" o el número como string
  
}`,
    testCases: [
      {
        input: '15',
        expectedOutput: '"FizzBuzz"',
        description: 'Divisible por 3 y 5'
      },
      {
        input: '9',
        expectedOutput: '"Fizz"',
        description: 'Divisible por 3'
      },
      {
        input: '10',
        expectedOutput: '"Buzz"',
        description: 'Divisible por 5'
      },
      {
        input: '7',
        expectedOutput: '"7"',
        description: 'No divisible por 3 ni 5'
      }
    ],
    points: 200
  },
  {
    title: 'Factorial',
    description: `Escribe una función que calcule el factorial de un número.

El factorial de n (n!) es el producto de todos los números positivos menores o iguales a n.

Ejemplo:
- Input: 5
- Output: 120 (porque 5! = 5 × 4 × 3 × 2 × 1 = 120)

- Input: 0
- Output: 1 (por definición, 0! = 1)`,
    difficulty: 'difícil',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es un número entero no negativo
  // Retorna el factorial del número
  
}`,
    testCases: [
      {
        input: '5',
        expectedOutput: '120',
        description: 'Factorial de 5'
      },
      {
        input: '0',
        expectedOutput: '1',
        description: 'Factorial de 0'
      },
      {
        input: '1',
        expectedOutput: '1',
        description: 'Factorial de 1'
      },
      {
        input: '7',
        expectedOutput: '5040',
        description: 'Factorial de 7'
      }
    ],
    points: 250
  },
  {
    title: 'Verificar Isograma',
    description: `Escribe una función que determine si una palabra o frase es un isograma.

Un isograma es una palabra o frase en la que ninguna letra se repite.

Ejemplo:
- Input: "murcielago"
- Output: true (ninguna letra se repite)

- Input: "javascript"
- Output: false (la letra 'a' se repite)

Reglas:
- Ignora mayúsculas y minúsculas
- Ignora espacios y caracteres no alfabéticos
- Una cadena vacía se considera un isograma`,
    difficulty: 'medio',
    starterCode: `// Escribe tu código aquí
function solution(input) {
  // input es una cadena de texto
  // Retorna true si es un isograma, false si no
  
}`,
    testCases: [
      {
        input: '"murcielago"',
        expectedOutput: 'true',
        description: 'Isograma simple en español'
      },
      {
        input: '"javascript"',
        expectedOutput: 'false',
        description: 'No es isograma - letra repetida'
      },
      {
        input: '"Programming"',
        expectedOutput: 'false',
        description: 'No es isograma - mayúsculas y minúsculas'
      },
      {
        input: '"Dermatoglyphics"',
        expectedOutput: 'true',
        description: 'Isograma con mayúsculas'
      },
      {
        input: '"isogram"',
        expectedOutput: 'true',
        description: 'Isograma simple'
      },
      {
        input: '"eleven"',
        expectedOutput: 'false',
        description: 'No es isograma - letra e repetida'
      },
      {
        input: '"subdermatoglyphic"',
        expectedOutput: 'true',
        description: 'Isograma largo'
      },
      {
        input: '""',
        expectedOutput: 'true',
        description: 'Cadena vacía es isograma'
      },
      {
        input: '"a"',
        expectedOutput: 'true',
        description: 'Una sola letra es isograma'
      },
      {
        input: '"Alphabet"',
        expectedOutput: 'false',
        description: 'No es isograma - letra a repetida'
      }
    ],
    points: 200
  }
];

async function seedDatabase() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/js-playground', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado a MongoDB');

    // Limpiar la base de datos (opcional - comentar si no quieres borrar datos existentes)
    // await Challenge.deleteMany({});
    // await User.deleteMany({});
    // console.log('🗑️  Base de datos limpiada');

    // Crear usuario administrador si no existe
    const adminExists = await User.findOne({ email: 'admin@jsplayground.com' });
    if (!adminExists) {
      const adminUser = new User({
        name: 'Administrador',
        email: 'admin@jsplayground.com',
        password: process.env.ADMIN_PASSWORD || 'atag553',
        isAdmin: true
      });
      await adminUser.save();
      console.log('👤 Usuario administrador creado');
    } else {
      console.log('👤 Usuario administrador ya existe');
    }

    // Insertar o actualizar retos de ejemplo
    for (const challengeData of sampleChallenges) {
      const exists = await Challenge.findOne({ title: challengeData.title });
      if (!exists) {
        const challenge = new Challenge(challengeData);
        await challenge.save();
        console.log(`✅ Reto creado: ${challengeData.title}`);
      } else {
        // Actualizar el reto existente con los nuevos campos
        await Challenge.findOneAndUpdate(
          { title: challengeData.title },
          challengeData,
          { new: true }
        );
        console.log(`🔄 Reto actualizado: ${challengeData.title}`);
      }
    }

    console.log('\n🎉 ¡Base de datos inicializada con éxito!');
    console.log(`📝 ${sampleChallenges.length} retos de ejemplo disponibles`);
    console.log('\n🔑 Credenciales de administrador:');
    console.log('   Usuario: atag');
    console.log('   Contraseña: atag553');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
