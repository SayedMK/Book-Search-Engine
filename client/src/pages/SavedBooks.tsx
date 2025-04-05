
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';



const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [ removeBook ] = useMutation(REMOVE_BOOK);

  // If loading, return a loading message
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If there's an error, return an error message
  if (error) {
    console.error(error);
    return <h2>Something went wrong while trying to fetch your saved books!</h2>;
  }

  const userData = data?.me || {};

  const handleDeleteBook = async (bookId: string) => {
    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      //remove it from local storage

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
      // If the delete fails, log the error to the console
    }
  };

  if (!userData?.username) {
    return (
      <h2>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h2>
    );
  }
  

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: any) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;


