// src/api/track.ts
export interface TrackingStatus {
    time: string;
    status: {
      code: string;
      name: string;
    };
    description: string;
  }
  
  export interface TrackResponse {
    track: {
      lastEvent: TrackingStatus;
      events: {
        edges: {
          node: TrackingStatus;
        }[];
      };
    };
  }
  
  export async function fetchTrackingData(
    carrierId: string,
    trackingNumber: string,
  ): Promise<TrackResponse> {
    const response = await fetch('https://apis.tracker.delivery/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `TRACKQL-API-KEY 97vetlqkkgltulpe7tmfq9pr2:3ii271qrmmir9pvnsj23s34cvv2l3nokhhn9desbbtkb08cqjoi`,
      },
      body: JSON.stringify({
        query: `
          query Track($carrierId: ID!, $trackingNumber: String!) {
            track(carrierId: $carrierId, trackingNumber: $trackingNumber) {
              lastEvent {
                time
                status {
                  code
                  name
                }
                description
              }
              events(last: 10) {
                edges {
                  node {
                    time
                    status {
                      code
                      name
                    }
                    description
                  }
                }
              }
            }
          }
        `,
        variables: {
          carrierId,
          trackingNumber,
        },
      }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }
  