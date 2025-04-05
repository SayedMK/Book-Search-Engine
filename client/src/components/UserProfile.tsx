import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const UserProfile = () => {
    const { loading, error, data } = useQuery(GET_ME);


    if ( loading ) 
        return <p>Loading</p>

    if ( error ) return  <p>Error :{error.message}</p>;

    const user = data.me;

    return (
        <div>
            <h1>Welcome, { user.userName }</h1>
            <p>Email: { user.email }</p>
            <p>Total Books Saved: { user.bookCount }</p>
            <h2>Saved Books:</h2>
            <ul>
                {user.savedBooks.map((book: any) => (
                    <li key = { book.bookId }>
                        <h3> ( book.title ) </h3>
                        <p>Authors: {book.authors.join(', ') }</p>
                        <p>Description: { book.description }</p>
                        <img src= { book.image } alt = {book.title} />
                        <a href={ book.link } target="_blank" rel="noopener noreferrer">
                            More Info
                            </a>
                    </li>
                ))} 
            </ul>
        </div>
    );
};

export default UserProfile;