export default function item(id, name, author, category, year, price, stock, description, img) {
    const item =
    {
        id: id,
        name: name,
        author: author,
        category: category,
        year: year,
        price: price,
        stock: stock,
        description: description,
        img: img,
    };
    return (item);
}
export function getBooks(title) {
    const items = getItems();
    let filterItems = [];
    if (title === "") { return (items); }
    else {
        for (let i = 0; i < items.length - 1; i++) {
            if (items[i].name.toLowerCase().includes(title.toLowerCase())) { filterItems.push(items[i]); console.log(items[i].name); }
        }
        return filterItems;
    }
}
export function getBookById(id) {
    const items = getItems();
    let book = "";
    for (let i = 0; i < items.length; i++) { if (items[i].id === id) { book = items[i]; } }
    return book;
}
export function getEmpty() { return item("", "", "", "", 0, 0, 0, "", ""); }
    
function getItems() {
    const items = [
        item("60dee0085b5f1c1d4ca30c57", "HARRY POTTER AND THE PHILOSOPHER`S STONE", "J.K. ROWLING", "Fantasy", 1997, 4050.00, 5, "Prepare to be spellbound by Jim Kay's dazzling depiction of the wizarding world and much loved characters in this full-colour illustrated hardback edition of the nation's favourite children's book - Harry Potter and the Philosopher's Stone. Brimming with rich detail and humour that perfectly complements J.K. Rowling's timeless classic, Jim Kay's glorious illustrations will captivate fans and new readers alike. When a letter arrives for unhappy but ordinary Harry Potter, a decade-old secret is revealed to him that apparently he's the last to know. His parents were wizards, killed by a Dark Lord's curse when Harry was just a baby, and which he somehow survived. Leaving his unsympathetic aunt and uncle for Hogwarts School of Witchcraft and Wizardry, Harry stumbles upon a sinister mystery when he finds a three-headed dog guarding a room on the third floor. Then he hears of a missing stone with astonishing powers, which could be valuable, dangerous - or both. An incredible adventure is about to begin!", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408845646.jpg"),
        item("60dee03c5b5f1c1d4ca30c58", "HARRY POTTER AND THE CHAMBER OF SECRETS", "J.K. ROWLING", "Fantasy", 1998, 4050.00, 7, "Prepare to be spellbound by Jim Kay's dazzling full-colour illustrations in this stunning new edition of J.K. Rowling's Harry Potter and the Chamber of Secrets. Breathtaking scenes, dark themes and unforgettable characters - including Dobby and Gilderoy Lockhart - await inside this fully illustrated edition. With paint, pencil and pixels, award-winning illustrator Jim Kay conjures the wizarding world as we have never seen it before. Fizzing with magic and brimming with humour, this inspired reimagining will captivate fans and new readers alike, as Harry and his friends, now in their second year at Hogwarts School of Witchcraft and Wizardry, seek out a legendary chamber and the deadly secret that lies at its heart ...", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408845653.jpg"),
        item("60dee0405b5f1c1d4ca30c59", "HARRY POTTER AND THE PRISONER OF AZKABAN", "J.K. ROWLING", "Fantasy", 1999, 1078.65, 2, "When the night Bus crashes through the darkness and screeches to a halt in front of him, it's the start of another far from ordinary year at Hogwarts for Harry Potter. Sirius Black, escaped mass-murderer and follower of Lord Voldemort, is on the run - and they say he is coming after Harry. In his first ever Divination class, Professor Trelawney sees an omen of death in Harry's tea leaves ... But perhaps most terrifying of all are the Dementors patrolling the school grounds, with their soul-sucking kiss.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408855676.jpeg"),
        item("60dee0455b5f1c1d4ca30c5a", "HARRY POTTER AND THE GOBLET OF FIRE", "J.K. ROWLING", "Fantasy", 2000, 1213.65, 100, "The Triwizard Tournament is to be held at Hogwarts. Only wizards who are over seventeen are allowed to enter - but that doesn't stop Harry dreaming that he will win the competition. Then at Hallowe'en, when the Goblet of Fire makes its selection, Harry is amazed to find his name is one of those that the magical cup picks out. He will face death-defying tasks, dragons and Dark wizards, but with the help of his best friends, Ron and Hermione, he might just make it through - alive!", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408855683.jpeg"),
        item("60dee04a5b5f1c1d4ca30c5b", "HARRY POTTER AND THE ORDER OF THE PHOENIX", "J.K. ROWLING", "Fantasy", 2003, 1213.65, 8, "Dark times have come to Hogwarts. After the Dementors' attack on his cousin Dudley, Harry Potter knows that Voldemort will stop at nothing to find him. There are many who deny the Dark Lord's return, but Harry is not alone: a secret order gathers at Grimmauld Place to fight against the Dark forces. Harry must allow Professor Snape to teach him how to protect himself from Voldemort's savage assaults on his mind. But they are growing stronger by the day and Harry is running out of time.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408855690.jpeg"),
        item("60dee04f5b5f1c1d4ca30c5c", "HARRY POTTER AND THE HALF BLOOD PRINCE", "J.K. ROWLING", "Fantasy", 2005, 1213.65, 4, "When Dumbledore arrives at Privet Drive one summer night to collect Harry Potter, his wand hand is blackened and shrivelled, but he does not reveal why. Secrets and suspicion are spreading through the wizarding world, and Hogwarts itself is not safe. Harry is convinced that Malfoy bears the Dark Mark: there is a Death Eater amongst them. Harry will need powerful magic and true friends as he explores Voldemort's darkest secrets, and Dumbledore prepares him to face his destiny.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408855706.jpeg"),
        item("60dee0545b5f1c1d4ca30c5d", "HARRY POTTER AND THE DEATHLY HALLOWS", "J.K. ROWLING", "Fantasy", 2007, 1213.65, 4, "As he climbs into the sidecar of Hagrid's motorbike and takes to the skies, leaving Privet Drive for the last time, Harry Potter knows that Lord Voldemort and the Death Eaters are not far behind. The protective charm that has kept Harry safe until now is now broken, but he cannot keep hiding. The Dark Lord is breathing fear into everything Harry loves, and to stop him Harry will have to find and destroy the remaining Horcruxes. The final battle must begin - Harry must stand and face his enemy.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9781408855713.jpeg"),
        item("60dee0585b5f1c1d4ca30c5e", "THE HOBBIT", "J.R.R. TOLKIEN", "Fantasy", 1937, 1006.88, 5, "The Hobbit is a tale of high adventure, undertaken by a company of dwarves in search of dragon-guarded gold. A reluctant partner in this perilous quest is Bilbo Baggins, a comfort-loving unambitious hobbit, who surprises even himself by his resourcefulness and skill as a burglar. Encounters with trolls, goblins, dwarves, elves and giant spiders, conversations with the dragon, Smaug, and a rather unwilling presence at the Battle of Five Armies are just some of the adventures that befall Bilbo. Bilbo Baggins has taken his place among the ranks of the immortals of children's fiction. Written by Professor Tolkien for his own children, The Hobbit met with instant critical acclaim when published.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9780261102217_10.jpg"),
        item("60dee05d5b5f1c1d4ca30c5f", "THE LORD OF THE RINGS: FELLOWSHIP OF THE RING", "J.R.R. TOLKIEN", "Fantasy", 1954, 1006.88, 6, "In a sleepy village in the Shire, a young hobbit is entrusted with an immense task. He must make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ruling Ring of Power ? the only thing that prevents the Dark Lord's evil dominion. Thus begins J.R.R.Tolkien's classic tale, which continues in The Two Towers and The Return of the King.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9780261102354.jpg"),
        item("60dee0615b5f1c1d4ca30c60", "THE LORD OF THE RINGS: TWO TOWERS", "J.R.R. TOLKIEN", "Fantasy", 1954, 1006.88, 1, "The Two Towers is the second part of Tolkien's epic adventure The Lord of the Rings. Frodo and the Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in a battle with an evil spirit in the Mines of Moria, and at the falls of Rauros, Boromir, seduced by the power of the ring, tried to seize it by force. While Frodo and Sam made their escape the rest of the Company were attacked by Orcs. Now they continue their journey alone down the great river Anduin.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9780261102361_1.jpg"),
        item("60dee0665b5f1c1d4ca30c61", "THE LORD OF THE RINGS: THE RETURN OF THE KING", "J.R.R. TOLKIEN", "Fantasy", 1955, 1006.88, 4, "Concluding the story of The Hobbit, this is the final part of Tolkien's epic masterpiece, The Lord of the Rings, featuring a striking black cover based on Tolkien's own design, the definitive text, and a detailed map of Middle-earth. The armies of the Dark Lord Sauron are massing as his evil shadow spreads even wider. Men, Dwarves, Elves and Ents unite forces to do battle against the Dark. Meanwhile, Frodo and Sam struggle further into Mordor, guided by the treacherous creature Gollum, in their heroic quest to destroy the One Ring... JRR Tolkien's great work of imaginative fiction has been labelled both a heroic romance and a classic fantasy fiction. By turns comic and homely, epic and diabolic, the narrative moves through countless changes of scene and character in an imaginary world which is totally convincing in its detail. Tolkien created a vast new mythology in an invented world which has proved timeless in its appeal.", "https://www.kelediciones.com/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/9/7/9780261102378_1.jpg"),
    ];
    let dbItems = JSON.parse(localStorage.getItem('products'));
    if (dbItems == null) { dbItems = [getEmpty()]; }
    return (dbItems);
}