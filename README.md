# Vue.js Live Streaming App with WebRTC

This repository accompanies [the article](https://getstream.io/blog/vuejs-webrtc-livestreaming/) on the [Stream blog](https://getstream.io/blog/) on how to build a [live-streaming application](https://getstream.io/video/livestreaming/) in [Vue.js](https://vuejs.org/) using Stream's native [Video & Audio SDK for JavaScript](https://getstream.io/video/docs/javascript/).

The tech we're using here:

- [Vue.js 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [Stream's Video & Audio SDK](https://getstream.io/video/docs/)
- [WebRTC](https://getstream.io/resources/projects/webrtc/basics/welcome/)

## Run project locally

To run the project on your own, you need to create an account on the [Stream Dashboard](https://dashboard.getstream.io/) and set up a new project.

Then, you need to create a `.env.local` file at the root of your project (similar to the `.env.template` file). Copy the API key of your Stream project into it.

To create a token for authenticating a user, you can either set up a server using one of our [backend SDKs](https://getstream.io/chat/sdk/#backend-clients). Or you can create a temporary token using our [free token generation tool](https://getstream.io/chat/docs/react/token_generator/).

## Feedback

If you enjoy the repository, feel free to give it a ⭐️. If you have more questions or additional feedback, feel free to [reach out via X](https://twitter.com/getstream_io).
