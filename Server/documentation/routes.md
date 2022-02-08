<h1 style="text-align:center;">These are all of the Routes that the API uses</h1>

<h2 id="users">User Routes: <code>/users</code></h2>
<ul>
    <li>POST <code>/users/add</code>: Adds a user given a user object as the body (<span style="color:red;">deprecated</span>)</li>
    <li>GET <code>/users/?id=[user_id]</code>: Gets a user given an ID as a query param</li>
    <li>DELETE <code>/users/?id=[user_id]</code>: Deletes a user given an ID as a query param</li>
    <li>PUT <code>/users/?id=[user_id]</code>: Edits a user based on an ID, given the changes as the body</li>
    <li>GET <code>/users/projects?id=[user_id]</code>: Gets the projects belonging to a user based on ID</li>
</ul>

<h2 id="auth">Authorization Routes: <code>/auth</code></h2>
<ul>
    <li>POST <code>/auth/login</code>: Gets an access tokens based on login credentials from the req body</li>
    <li>POST <code>/auth/register</code>: Registers a user and returns access tokens based on login credentials from the req body</li>
    <li>POST <code>/auth/refresh</code>: Refreshes a user's access token based on a refresh token</li>
    <li>DELETE <code>/auth/logout</code>: Deletes a user's refresh token from the database</li>
</ul>

<h2 id="projects">Project Routes: <code>/projects</code></h2>
<ul>
    <li>POST <code>/projects/add</code>: Adds a project given the project info as the body</li>
    <li>GET <code>/projects/?projectID=[project_id]</code>: Gets a project based on an ID</li>
    <li>PUT <code>/projects/?projectID=[project_id]</code>: Updates a project based on a project ID</li>
    <li>DELETE <code>/projects/?projectID=[project_id]</code>: Deletes a project based on a project ID</li>
</ul>

<h2 id="components">Component Routes: <code>/projects/component</code></h2>
<ul>
    <li>PUT <code>/projects/component?projectID=[project_id]</code>: Adds a component to a project based on ID</li>
    <li>GET <code>/projects/component?projectID=[project_id]&name=[file_path]</code>: Gets a component based on the project id and component file path</li>
    <li>PATCH <code>/projects/component?projectID=[project_id]&name=[file_path]</code>: Updates a based on params with the update in the body</li>
    <li>DELETE <code>projects/component?projectID=[project_id]&name=[file_path]</code>: Deletes a component based on params</li>
</ul>
