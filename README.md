Stack used: MERN
Project structure: MVC

Backend:
Routes:
Main: Order-related operations.
Testing: Temporary routes for generating tokens and products.

Middleware:
Logger: Logs incoming requests for dorensics analysis.
CORS: Enables cross-origin requests.
Error Handling: Manages errors globally.
Authentication: Jwt based user authentication for each api endpoint.

Currently, there is an array of predefined users form which a user gets selected randomly each time page is refresh. This is to minimize the plugin's
dependeny on the current project's auth for seamless integration with main project.

Frontend:
API: Seprate file for alL api definitions.
Component: Each component separated for better modularity.
Pages: Single page app.
Input sanitation: Frontend inputs are sanitized to prevent api abuse.

You can find project on my github: https://github.com/Sdrago92399/negotiation-mern/tree/main
