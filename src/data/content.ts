import { ImageSourcePropType } from 'react-native';
export type Article = {
  id: string;
  title: string;
  category: string;
  date: string;
  image: ImageSourcePropType;
  description: string;
  paragraphs: string[];
};
export const articles: Article[] = [
  {
    id: 'ClayTabletsAndFirstRecords',
    title: 'Clay Tablets And First Records',
    category: 'ANCIENT MESOPOTAMIA',
    date: 'c. 3500 BC',
    image: require('../assets/article-clay-tablets-and-first-records.png'),
    description: 'The first books did not look like the books we know today.',
    paragraphs: [
      'The first books did not look like the books we know today. In ancient Mesopotamia, people recorded information on clay tablets using cuneiform writing. These records helped preserve laws, trade agreements, myths, and important events.',
      'Clay tablets were heavy, but they were extremely durable. Because of them, some of humanity\u2019s earliest stories survived for thousands of years. They became the first step toward the idea of a book as a container for knowledge.',
    ],
  },
  {
    id: 'PapyrusScrollsOfEgypt',
    title: 'Papyrus Scrolls Of Egypt',
    category: 'ANCIENT EGYPT',
    date: 'c. 3100 BC',
    image: require('../assets/article-papyrus-scrolls-of-egypt.png'),
    description:
      'In Ancient Egypt, papyrus became one of the most important writing materials.',
    paragraphs: [
      'In Ancient Egypt, papyrus became one of the most important writing materials. It was made from plants growing near the Nile, then pressed and joined into long sheets. Religious texts, medical knowledge, administrative records, and stories were written on papyrus scrolls.',
      'Papyrus was lighter and easier to carry than clay, so knowledge became easier to store and move. Egyptian scribes held an important social role because writing connected them to power, learning, and culture. Papyrus scrolls became one of the most recognizable symbols of early book history.',
    ],
  },
  {
    id: 'BirthOfTheScroll',
    title: 'Birth Of The Scroll',
    category: 'CLASSICAL WORLD',
    date: 'c. 600 BC',
    image: require('../assets/article-birth-of-the-scroll.png'),
    description:
      'The scroll became an important format for preserving long texts in ancient civilizations.',
    paragraphs: [
      'The scroll became an important format for preserving long texts in ancient civilizations. It could be unrolled gradually, allowing readers to move through the text in sections. Scrolls were used in Egypt, Greece, Rome, and many other cultures.',
      'Scrolls were convenient to store in libraries and transport between cities. However, finding a specific passage inside a long scroll was difficult because there were no pages in the modern sense. This limitation later encouraged people to create a new book format.',
    ],
  },
  {
    id: 'ParchmentAndDurablePages',
    title: 'Parchment And Durable Pages',
    category: 'ANCIENT WORLD',
    date: 'c. 200 BC',
    image: require('../assets/article-parchment-and-durable-pages.png'),
    description:
      'After papyrus, parchment became an important writing material.',
    paragraphs: [
      'After papyrus, parchment became an important writing material. It was made from specially prepared animal skin, which made it stronger and more durable. Parchment could also be written on both sides, making it very practical.',
      'Parchment was more expensive, but it was ideal for important texts. It was often used for religious books, laws, and scholarly works. Thanks to its durability, many ancient manuscripts survived to the present day.',
    ],
  },
  {
    id: 'CodexRevolution',
    title: 'Codex Revolution',
    category: 'THE CODEX',
    date: 'c. 100 AD',
    image: require('../assets/article-codex-revolution.png'),
    description: 'The codex was a major breakthrough in the history of books.',
    paragraphs: [
      'The codex was a major breakthrough in the history of books. Unlike a scroll, it was made of separate pages bound together on one side. This format closely resembles the modern book.',
      'The codex was easier to turn, carry, and search through. It gradually replaced scrolls, especially in religious and educational writing. Because of the codex, reading became more practical and much closer to the experience we know today.',
    ],
  },
  {
    id: 'MonasteriesAndManuscripts',
    title: 'Monasteries And Manuscripts',
    category: 'MIDDLE AGES',
    date: 'c. 500 AD',
    image: require('../assets/article-monasteries-and-manuscripts.png'),
    description:
      'During the Middle Ages, monasteries played a key role in preserving books.',
    paragraphs: [
      'During the Middle Ages, monasteries played a key role in preserving books. Monks copied texts by hand in special rooms called scriptoria. This work required patience, accuracy, and a great amount of time.',
      'A single book could take months or even years to complete. Because of this, manuscripts were highly valuable and available only to a small part of society. Monastic books helped preserve religious, philosophical, and scientific knowledge across Europe.',
    ],
  },
  {
    id: 'IlluminatedBooks',
    title: 'Illuminated Books',
    category: 'MEDIEVAL ART',
    date: 'c. 800 AD',
    image: require('../assets/article-illuminated-books.png'),
    description:
      'Illuminated manuscripts were not only texts, but works of art.',
    paragraphs: [
      'Illuminated manuscripts were not only texts, but works of art. They were decorated with gold details, ornaments, miniature paintings, and elaborate letters. These books were often created for churches, rulers, or wealthy patrons.',
      'Each page could have its own visual composition and artistic logic. Images helped explain the meaning of the text and made the book feel more ceremonial. Illuminated manuscripts show that books have always been both sources of knowledge and objects of beauty.',
    ],
  },
  {
    id: 'PaperTravelsTheWorld',
    title: 'Paper Travels The World',
    category: 'PAPER & CULTURE',
    date: 'c. 105 AD',
    image: require('../assets/article-paper-travels-the-world.png'),
    description:
      'Paper became one of the most important inventions in book history.',
    paragraphs: [
      'Paper became one of the most important inventions in book history. It was first developed in China, and the technology later spread through Asia, the Middle East, and Europe. Paper was cheaper and easier to produce than parchment.',
      'As paper became more common, books slowly became more accessible. It was used for manuscripts, letters, educational texts, and official documents. Paper prepared the world for the major transformation brought by printing.',
    ],
  },
  {
    id: 'PrintingPressChangesEverything',
    title: 'Printing Press Changes Everything',
    category: 'PRINTING REVOLUTION',
    date: 'c. 1450 AD',
    image: require('../assets/article-printing-press-changes-everything.png'),
    description:
      'In the fifteenth century, Johannes Gutenberg\u2019s printing press changed the history of reading.',
    paragraphs: [
      'In the fifteenth century, Johannes Gutenberg\u2019s printing press changed the history of reading. Books no longer had to be copied by hand because text could be printed many times. This made book production faster and less expensive.',
      'Printing helped spread knowledge more quickly than ever before. More people gained access to education, science, religious texts, and literature. The printing press turned the book into a mass cultural object.',
    ],
  },
  {
    id: 'PublicLibrariesAndReaders',
    title: 'Public Libraries And Readers',
    category: 'PUBLIC KNOWLEDGE',
    date: '19th century',
    image: require('../assets/article-public-libraries-and-readers.png'),
    description:
      'Over time, books moved beyond monasteries, universities, and private collections.',
    paragraphs: [
      'Over time, books moved beyond monasteries, universities, and private collections. Public libraries allowed people to read without needing to buy every book. This changed the role of knowledge and made reading part of public life.',
      'Libraries became places for learning, discovery, and community. They preserved books about history, science, art, literature, and many other subjects. Public libraries helped create a culture of accessible reading.',
    ],
  },
  {
    id: 'PaperbackEra',
    title: 'Paperback Era',
    category: 'EVERYDAY READING',
    date: '20th century',
    image: require('../assets/article-paperback-era.png'),
    description: 'The paperback made books even closer to everyday readers.',
    paragraphs: [
      'The paperback made books even closer to everyday readers. These books were cheaper, lighter, and easier to use in daily life. People could take them on trips, read them on public transport, or carry them in a bag.',
      'The paperback format had a strong impact on popular literature. Novels, mysteries, adventure stories, and educational books became available to wider audiences. Books were no longer luxury objects, but familiar parts of everyday life.',
    ],
  },
  {
    id: 'DigitalBooksAndModernReading',
    title: 'Digital Books And Modern Reading',
    category: 'DIGITAL AGE',
    date: '1971\u2013today',
    image: require('../assets/article-digital-books-and-modern-reading.png'),
    description: 'In the digital age, books gained new formats.',
    paragraphs: [
      'In the digital age, books gained new formats. E-books, audiobooks, and reading apps allow people to read or listen almost anywhere. An entire library can now fit inside a single device.',
      'Digital books did not fully replace printed books, but they expanded the reading experience. Readers can adjust font size, make notes, search for words, and sync progress across devices. The history of books continues by combining old traditions with new technology.',
    ],
  },
];
