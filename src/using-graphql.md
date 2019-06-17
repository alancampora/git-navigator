
{
  repository(owner: "testing-library", name: "react-testing-library") {
    ref(qualifiedName: "master") {
      target {
        ... on Commit {
          history(after: "3076b119172b8b7188603509bfe576b7d2914de3 140", first: 100) {
            totalCount
            edges {
              node {
                commitUrl
                committedDate
                message
                additions
                changedFiles
                commitUrl
                author {
                  date
                  email
                  name
                }
                tree {
                  entries {
                    name
                    object {
                      commitUrl
                    }
                  }
                }
              }
              cursor
            }
          }
        }
      }
    }
  }
}
