# To Run
- Install docker
- git clone this repo

## To run the application
- Move into the root directory: `cd /path/to/forests-inventory`
- `docker-compose up --build`
- This will also run tests.
- Once the application has started up, see the running application at http://0.0.0.0:3000/forests (must be http, not https)
- API endpoints can also be tested directly by going to e.g. http://0.0.0.0:8000/forests


## To run tests
- Move into the root directory: `cd /path/to/forests-inventory`

### Frontend Tests
- `docker-compose build frontendtest`
- `docker-compose run --rm frontendtest`
- It may take a while for tests to run.

### API Tests
- `docker-compose build frontendtest`
- `docker-compose run --rm frontendtest`

# Code Organization
The code is split into a JS/React frontend and a Python/Django api module. Frontend code is in `forests-inventory/frontend` and backend/api code is in `forests-inventory/api`.
## Important files/directories
### frontend
- Follows the structure of a standard React app.
- Some routing logic and boilerplate in `forests-inventory/frontend/src/App.js`
- Everything else of interest is in `forests-inventory/frontend/src/pages` and `forests-inventory/frontend/src/components`
### api
- Routing: `forests-inventory/api/forestsinventory/urls.py` and `forests-inventory/api/forests/urls.py`
- Database models: `forests-inventory/api/forests/models.py`
- API business logic: `forests-inventory/api/forests/views.py`
- Tests: `forests-inventory/api/forestsinventory/test.py`
- Seed data: in the files starting with e.g. `0000_auto` in the `forests-inventory/api/forests/migrations` folder.
# Discussion Points
## Notes
- I'm only showing 2 forests per page rather than the 6 in the mockup to illustrate paging working since I only made 3 seed forests.
- I mostly viewed the site on my 13" mac monitor, so styling could appear off on larger screen sizes.
## Major Design Decisions and Tradeoffs
### Client side vs. server side pagination for forests page
I opted to do exclusively client side paging for loading the forests. Given the time constraints, this seemed most achievable, as it keeps both the frontend and backend code much simpler, and with a small number of forests it has the benefit of the UI feeling quick and responsive once all the forests are loaded in. Of course, this has the tradeoff of not scaling to large numbers of forests. Caching may be able to mitigate that to some degree, but if the site/api were to truly serve data on every forest in the world, some kind of server side solution to limit the size of the result set would be needed (pagination or a limit on the number of forests returned). I would want to try to find the balance between enough results for the search and filter features to feel fast, but not so many that the initial load time is long.
### How much information to return for each forest from the /forests endpoint
I chose to return a smaller amount of information for each forest when requesting the data for all forests, and retrieve the full information from the server only when navigating to the forest detail page. Since all data but the health metrics is available in the Forest table, I could easily have sent back more. But given I'm sending info for every single forest as discussed in the previous point, I wanted to keep the results as small as possible when requesting a lot of forests. The long_description field in particular would increase the size of data sent over the wire dramatically. With server side pagination, this would maybe be less of an issue though.
### Modeling the health metrics on the backend
I have a dedicated API and table for health metrics, and each row has a foreign key to the forest table, a date, and a value for tons of carbon stored. I chose this because it makes it flexible to a wider variety of analytics requests. If we have data for every day, we can easily change the API to return the change in carbon over a day, week, or year in addition to 30 days. No new fields required in the database. The potential issue is that this assumes the database will have a new value at the beginning of every day. If we don't get new values every day, the query logic must become more complicated, and a different model might make more sense. Even if we do get a new value every day, it would be hard to ensure it's available and populated in the db at exactly midnight on each new day. Not to mention time zone issues.
## Possible Improvements
- Testing could be more robust throughout.
- As noted in the Design Decisions, performance on the /forests page would suffer dramatically with a large enough number of forests. For a real app with more forests I'd want to do some optimzations like e.g. better configure how often the change event on the search input gets toggled. I'd also consider implementing server-side pagination so the client isn't overworked with too many forests at once.
- Both Frontend and API should have more error states so clear messages could be sent to the user/caller in the case of issues.
- Images should be stored somewhere I have control over, like S3. I'm just linking to images from Wikipedia right now, so the images will break if the links change.
- Frontend needs loading states with e.g. a spinner. The half-second or so before the forest data loads in is pretty ugly right now.
- The css in general is a little hacky as it was strictly targeted to look good on my 13" mac monitor. Needs to be made responsive to various screen sizes.
- The ForestList component feels a little bloated. Making dedicated components for the search and filter would be a good first step towards reducing the amount of JSX in there.
- I'm relatively new to Docker, React, and Django, so I'm sure there are some best practices violated in places that I haven't noted here.
