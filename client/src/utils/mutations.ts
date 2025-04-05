import { gql } from '@apollo/client';

// mutation to log in the user 

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
    }
`;

// mutation to add a new user

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
        token
        user {
          _id
          username
        }
      }
    }
`;

// mutation to save a book
export const SAVE_BOOK = gql`
    mutation SaveBook(
      $bookId: String!,
      $title: String!,
      $authors: [String],
      $description: String,
      $image: String,
      $link: String
    ) {
      saveBook(
        bookId: $bookId,
        title: $title,
        authors: $authors,
        description: $description,
        image: $image,
        link: $link
      ) {
        _id
        username
        savedBooks {
          bookId
          title
        }
      }
    }
`;
// mutation to remove a book

export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: String!) {
      removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
          bookId
          title
        }
      }
    }
`;