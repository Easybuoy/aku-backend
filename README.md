# aku-backend

\h3>Link to API: <a href="https://aku-test.herokuapp.com">Aku API</a> </h3>

<h2>API Routes</h2> <br>

| DESCRIPTION                    | HTTP METHOD | ROUTES                             | ACCESS  |
| ------------------------------ | ----------- | ---------------------------------- | ------- |
| Register Driver                | POST        | /api/v1/drivers/register           | PUBLIC  |
| Login Driver                   | POST        | /api/v1/drivers/login              | PUBLIC  |
| Create Association             | POST        | /api/v1/associations               | PUBLIC  |
| Assign driver to association   | POST        | /api/v1/drivers/assignassociation  | PRIVATE |
| Add contributions as a driver  | POST        | /api/v1/contributions/contribute   | PRIVATE |
| View contributions as a driver | GET         | /api/v1/contributions              | PRIVATE |
| Add weekly interests           | GET         | /api/v1/contributions/addInterests | PRIVATE |

<br><br>
