import React from 'react'
import { Card, Feed } from 'semantic-ui-react'

const News = () => (
  <Card 
      style={{
          width: "50% ",
      }}
  >
    <Card.Content style={{"flexGrow":"0",}} >
      <Card.Header style={{"fontSize":"25px"}} ><h2>NewsFeed</h2></Card.Header>
    </Card.Content>

    <Card.Content>
    <Feed>
      <Feed.Event>
          <Feed.Content>
          <Feed.Date content='27/06/2021' />
          <Feed.Summary>
            You added Jenny Hess to your coworker group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Content>
          <Feed.Date content='27/06/2021' />
          <Feed.Summary>
            You added Molly Malone as a friend.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Content>
          <Feed.Date content='27/06/2021' />
          <Feed.Summary>
            You added Elliot Baker to your musicians group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Content>
          <Feed.Date content='27/06/2021' />
          <Feed.Summary>
            You added Elliot Baker to your musicians group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>

      <Feed.Event>
        <Feed.Content>
          <Feed.Date content='27/06/2021' />
          <Feed.Summary>
            You added Elliot Baker to your musicians group.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
    </Card.Content>
  </Card>
)

export default News