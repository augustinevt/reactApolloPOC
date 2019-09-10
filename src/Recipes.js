import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query =   gql`
    {
      recipes {
        id
        title
      }
    }
  `;

export default function () {
  return (
    <Query
      query={query}
    >

    {({ data, loading, error }) => {
      if (loading) return <p> loading </p>;
      if (error) return <p> error </p>;

      return (
        <ul>
          {
            data.recipes.map(({id, title}) =>
              <li key={id}> {title} </li>
            )
          }
        </ul>
      )
    }}

    </Query>
  )
}