const source = `What material was used for some of the earliest written records?;Clay tablets;Glass sheets;Printed paper;Digital screens
Which ancient civilization is strongly connected with papyrus scrolls?;Ancient Egypt;Medieval France;Modern Japan;Viking Scandinavia
What plant was papyrus made from?;A plant growing near the Nile;Oak trees;Cotton flowers;Bamboo roots
Why were clay tablets important in early book history?;They preserved laws, trade, myths, and records;They allowed digital reading;They were used for printed novels;They replaced public libraries
What was one advantage of papyrus over clay tablets?;It was lighter and easier to carry;It was made of metal;It could play audio;It was cheaper than all modern books
What format allowed long texts to be unrolled gradually?;Scroll;Paperback;E-book;Bookmark
Why were scrolls sometimes difficult to use?;Finding a specific passage could take time;They had too many digital buttons;They could not hold any text;They were always made of glass
What material was parchment made from?;Specially prepared animal skin;Pressed river plants;Melted stone;Printed plastic
Why was parchment practical for books?;It could be written on both sides;It erased all text automatically;It needed electricity;It only worked with pictures
What was the codex made of?;Separate pages bound together on one side;One long rolled sheet only;A digital screen with audio;A stone wall with carvings
Why was the codex a major breakthrough?;It was easier to turn, carry, and search through;It made books impossible to copy;It removed pages from books;It was used only for decoration
What modern object does the codex most closely resemble?;A printed book;A clay pot;A wall painting;A music player
Where were many books copied by hand during the Middle Ages?;Monasteries;Train stations;Shopping centers;Factories
What were rooms for copying manuscripts often called?;Scriptoria;Cinemas;Markets;Studios
Why were medieval manuscripts so valuable?;They took a long time and great skill to create;They were printed in millions;They were made only for children;They were sold only as paperbacks
What made illuminated manuscripts special?;Gold details, ornaments, and miniature paintings;Built-in search tools;Plastic covers;Moving animations
Who often received illuminated manuscripts?;Churches, rulers, or wealthy patrons;Only modern app users;Factory workers only;Online libraries only
Where was paper first developed?;China;Egypt;Rome;Germany
Why did paper change book history?;It was cheaper and easier to produce than parchment;It could not be written on;It was heavier than clay;It was only used for statues
What invention changed book production in the fifteenth century?;The printing press;The smartphone;The stone tablet;The audio speaker
Who is strongly associated with the movable type printing press in Europe?;Johannes Gutenberg;Julius Caesar;Tutankhamun;Leonardo da Vinci
What did the printing press make possible?;Faster and less expensive book production;Books written only by hand;Fewer readers;The end of paper
How did printing affect knowledge?;It helped spread knowledge more quickly;It made reading disappear;It limited books to one city;It replaced all libraries
What did public libraries help people do?;Read without buying every book;Print money;Build clay tablets;Remove books from society
Why are public libraries important in reading history?;They made access to books more public;They stopped people from learning;They only stored blank pages;They replaced all schools
What made paperback books popular?;They were cheaper, lighter, and easy to carry;They were made of stone;They required a monk to read them;They could not be taken outside
Which type of literature became more accessible through paperbacks?;Novels, mysteries, and adventure stories;Only ancient tax records;Only cave markings;Only royal laws
What is one feature of digital books?;Readers can adjust font size and search for words;They are always written on clay;They cannot contain notes;They must be unrolled
What modern formats expanded the idea of books?;E-books, audiobooks, and reading apps;Stone walls, coins, and statues;Candles, maps, and cups;Scroll cases only
What is the main idea of the book history timeline?;Books evolved from early records to digital reading;Books appeared only after smartphones;Books were always printed;Books were never connected to culture`;
export const questions = source.split('\n').map((line, id) => {
  const [question, correct, ...others] = line.split(';');
  return { id, question, correct, options: [correct, ...others] };
});
export function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export const createQuiz = () =>
  shuffle(questions)
    .slice(0, 10)
    .map(q => ({ ...q, options: shuffle(q.options) }));
