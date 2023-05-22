const { PrismaClient } = require('@prisma/client')
const prismadb = new PrismaClient()

const tagsContstant:string[] = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express",
    "GraphQL",
    "Webpack",
    "Babel",
    "Sass",
    "Less",
    "Stylus",
    "jQuery",
    "Bootstrap",
    "Tailwind",
    "Figma",
    "Sketch"
  ];
  

async function main() {

    try {
        for (const tag of tagsContstant) {
          await prismadb.tag.create({
            data: {
              name: tag
            }
          });
        }
    
        console.log('Tag seeder completed successfully.');
      } catch (error) {
        console.error('Error seeding tags:', error);
      }
  
}
main()