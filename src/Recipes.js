import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import query from './recipesQuery';
import gql from 'graphql-tag';

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`


class Recipes extends Component {

  state = {
    vegetarian: false
  }

  updateVegetarian = ({target: { checked} }) => {
    this.setState({ vegetarian: checked });
  }

  render() {
    return (
      <React.Fragment>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegetarian}
          />
          <span> Only Vegetarian </span>
        </label>
        <Query
          query={query}
          variables={{ vegetarian: this.state.vegetarian }}
        >

        {({ data, loading, error, refetch }) => {
          if (loading) return <p> loading </p>;
          if (error) return <p> error </p>;

          return (
            <ul>
              {
                data.recipes.map(({id, title, isStarred}) =>
                  <li key={id}>
                    {title}
                    <Mutation
                      mutation={updateRecipeStarredMutation}
                      awaitFetchQueries={true}
                      refetchQueries={[
                        {
                          query: query,
                          variables: {
                            vegetarian: false
                          }
                        },
                        {
                          query: query,
                          variables: {
                            vegetarian: true
                          }
                        }
                      ]}
                    >

                      {
                        (updateRecipesStarred, {loading, error}) => (
                          <button
                            onClick={() => {
                              updateRecipesStarred({
                                variables: {
                                  id,
                                  isStarred: !isStarred
                                }
                              })
                            }}
                            style={{
                              color: isStarred ? 'orange' : 'grey',
                              animation: loading ?
                                "inflate 0.7s ease infinite alternate" :
                                "none"
                            }}>
                            * { error && 'Failed to update'}
                          </button>
                        )
                      }

                    </Mutation>


                   </li>
                )
              }
              <button onClick={() => refetch()}> Refresh Recipes </button>
            </ul>

          )

        }}

        </Query>
      </React.Fragment>
    )
  }
}

export default Recipes;