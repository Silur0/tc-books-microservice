import AccountService from "../../features/accounts/application/services/AccountService";
import { AppDataSource } from "../database/Database";
import { Book } from "../../features/books/dal/Entities/Book";
import { BookResponse } from "../../features/books/application/contracts/responses/BookResponse";
import { Repository } from "typeorm";
import { User } from "../../features/accounts/dal/Entities/User";

const booksData = [
    {
        isbn: "978-0-571-33464-3",
        title: "Normal People",
        author: "Sally Rooney",
        publicationYear: "2018",
        language: "English",
        summary:
            '"Normal People" by Sally Rooney follows the complex relationship between Connell and Marianne as they navigate love, friendship, and social class dynamics. The novel explores themes of intimacy, communication, and personal growth.',
    },
    {
        isbn: "978-1-5011-1036-8",
        title: "It Ends with Us",
        author: "Colleen Hoover",
        publicationYear: "2016",
        language: "English",
        summary:
            '"It Ends with Us" delves into the complexities of love, strength, and resilience as Lily faces the tumultuous past with her first love Ryle. This emotional journey challenges her perceptions of relationships and what it means to truly stand up for oneself.',
    },
    {
        isbn: "978-0-575-08244-1",
        title: "The Last Wish",
        author: "Andrzej Sapkowski",
        publicationYear: "1993",
        language: "Polish",
        summary:
            '"The Last Wish" follows Geralt of Rivia, a monster hunter, as he navigates a world of magic and danger while grappling with his own sense of morality and destiny. This collection of short stories serves as an introduction to the Witcher series and delves into themes of power, choice, and the consequences of our actions.',
    },
    {
        isbn: "978-0-7432-4722-1",
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        publicationYear: "1953",
        language: "English",
        summary:
            '"Fahrenheit 451" by Ray Bradbury explores a dystopian society where books are banned and firefighters burn any that are found. The protagonist, Guy Montag, becomes disillusioned with his role and embarks on a journey to preserve literature and knowledge.',
    },
    {
        isbn: "978-0-06-112008-4",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationYear: "1960",
        language: "English",
        summary:
            "A novel set in the Depression-era South, where Scout Finch recounts her childhood and her father's fight for justice as he defends a black man falsely accused of raping a white woman.",
    },
    {
        isbn: "978-0-452-28423-4",
        title: "1984",
        author: "George Orwell",
        publicationYear: "1949",
        language: "English",
        summary:
            "In a dystopian future, Winston Smith struggles under the oppressive rule of a totalitarian regime that monitors and controls every aspect of human life.",
    },
    {
        isbn: "978-0-19-953556-9",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        publicationYear: "1813",
        language: "English",
        summary:
            "The classic tale of Elizabeth Bennet and Mr. Darcy's complex relationship, highlighting themes of love, social class, and misunderstandings.",
    },
    {
        isbn: "978-0-7432-7356-4",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publicationYear: "1925",
        language: "English",
        summary:
            "A novel depicting the American Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.",
    },
    {
        isbn: "978-0-14-243724-7",
        title: "Moby Dick",
        author: "Herman Melville",
        publicationYear: "1851",
        language: "English",
        summary:
            "Captain Ahab’s obsessive quest to hunt the great white whale, Moby Dick, drives this epic tale of adventure and vengeance.",
    },
    {
        isbn: "978-0-14-044913-6",
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        publicationYear: "1866",
        language: "Russian",
        summary:
            "A psychological drama that follows Raskolnikov, a young man who plans a murder, grappling with guilt and redemption.",
    },
    {
        isbn: "978-0-316-76948-0",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publicationYear: "1951",
        language: "English",
        summary:
            "Holden Caulfield, a teenager in New York City, narrates his experiences and struggles with growing up, loneliness, and alienation.",
    },
    {
        isbn: "978-0-06-085052-4",
        title: "Brave New World",
        author: "Aldous Huxley",
        publicationYear: "1932",
        language: "English",
        summary:
            "A dystopian novel that explores a future world where technological advances have led to a loss of individuality and freedom.",
    },
    {
        isbn: "978-0-7434-8773-6",
        title: "The Da Vinci Code",
        author: "Dan Brown",
        publicationYear: "2003",
        language: "English",
        summary:
            "A thrilling mystery novel that follows Robert Langdon as he uncovers secrets hidden in famous works of art and religious symbols.",
    },
    {
        isbn: "978-0-307-27778-6",
        title: "The Road",
        author: "Cormac McCarthy",
        publicationYear: "2006",
        language: "English",
        summary:
            "A post-apocalyptic novel that follows a father and son as they journey through a desolate landscape, struggling to survive.",
    },
    {
        isbn: "978-0-7432-7356-4",
        title: "One Hundred Years of Solitude",
        author: "Gabriel García Márquez",
        publicationYear: "1967",
        language: "Spanish",
        summary:
            "The story of the Buendía family and their fortunes in the fictional town of Macondo, blending reality and fantasy.",
    },
    {
        isbn: "978-1-4767-4658-6",
        title: "The Shining",
        author: "Stephen King",
        publicationYear: "1977",
        language: "English",
        summary:
            "Jack Torrance becomes the winter caretaker at the isolated Overlook Hotel, where dark forces slowly drive him to madness.",
    },
    {
        isbn: "978-0-7434-8773-7",
        title: "Angels & Demons",
        author: "Dan Brown",
        publicationYear: "2000",
        language: "English",
        summary:
            "Robert Langdon races against time to uncover a conspiracy involving the Illuminati and the Vatican.",
    },
    {
        isbn: "978-0-14-303943-3",
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        publicationYear: "2003",
        language: "English",
        summary:
            "A story of friendship and redemption, following the lives of two boys in Afghanistan before and after the Soviet invasion.",
    },
    {
        isbn: "978-0-385-51781-4",
        title: "A Game of Thrones",
        author: "George R.R. Martin",
        publicationYear: "1996",
        language: "English",
        summary:
            "In the land of Westeros, powerful families vie for control of the Iron Throne, leading to epic battles and political intrigue.",
    },
    {
        isbn: "978-0-394-82349-1",
        title: "Beloved",
        author: "Toni Morrison",
        publicationYear: "1987",
        language: "English",
        summary:
            "Sethe, an escaped slave, is haunted by the ghost of her dead daughter in this powerful novel about memory and trauma.",
    },
    {
        isbn: "978-0-14-017739-8",
        title: "Of Mice and Men",
        author: "John Steinbeck",
        publicationYear: "1937",
        language: "English",
        summary:
            "The story of two displaced ranch workers, George and Lennie, who strive to make a life during the Great Depression.",
    },
    {
        isbn: "978-0-452-28423-5",
        title: "Lord of the Flies",
        author: "William Golding",
        publicationYear: "1954",
        language: "English",
        summary:
            "A group of boys stranded on an uninhabited island descends into savagery as they struggle to govern themselves.",
    },
    {
        isbn: "978-1-4028-9467-8",
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        publicationYear: "1890",
        language: "English",
        summary:
            "Dorian Gray remains youthful while his portrait ages, reflecting the consequences of his indulgent and corrupt lifestyle.",
    },
    {
        isbn: "978-0-618-00221-3",
        title: "The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        publicationYear: "1954",
        language: "English",
        summary:
            "The first book in The Lord of the Rings trilogy, where Frodo Baggins begins his quest to destroy the One Ring.",
    },
    {
        isbn: "978-0-307-27778-7",
        title: "The Book Thief",
        author: "Markus Zusak",
        publicationYear: "2005",
        language: "English",
        summary:
            "Narrated by Death, the story follows Liesel, a young girl living in Nazi Germany who steals books and shares them with others.",
    },
    {
        isbn: "978-0-06-231500-7",
        title: "The Alchemist",
        author: "Paulo Coelho",
        publicationYear: "1988",
        language: "Portuguese",
        summary:
            "A philosophical novel about a young shepherd named Santiago, who embarks on a journey to find his personal legend.",
    },
    {
        isbn: "978-1-59448-000-3",
        title: "Norwegian Wood",
        author: "Haruki Murakami",
        publicationYear: "1987",
        language: "Japanese",
        summary:
            "A nostalgic and melancholy story of love and loss, following Toru Watanabe as he reminisces about his college days.",
    },
    {
        isbn: "978-0-14-118280-3",
        title: "Animal Farm",
        author: "George Orwell",
        publicationYear: "1945",
        language: "English",
        summary:
            "A satirical allegory about a group of farm animals who overthrow their human farmer, only to end up under a new tyranny.",
    },
    {
        isbn: "978-0-679-74558-7",
        title: "Catch-22",
        author: "Joseph Heller",
        publicationYear: "1961",
        language: "English",
        summary:
            "The absurdity of war is explored through the experiences of Captain Yossarian, a bomber pilot in World War II.",
    },
];

export class EtlService {
    private readonly userRepo: Repository<User> =
        AppDataSource.getRepository(User);

    private readonly booksRepo: Repository<BookResponse> =
        AppDataSource.getRepository(Book);

    async run() {
        const users = await this.userRepo.find();

        if (users.length > 0) return;

        AccountService.register({
            username: "admin",
            password: "admin",
        });

        booksData.forEach((e) => {
            let book = new Book();

            book.isbn = e.isbn;
            book.title = e.title;
            book.author = e.author;
            book.publicationYear = e.publicationYear;
            book.language = e.language;
            book.summary = e.summary;

            this.booksRepo.save(book);
        });

        this.booksRepo.create();
    }
}

export default new EtlService();
