<h1 style="text-align:center;font-size:64px;">Component Tracker</h1>

<div style="">
<h2>Description:</h2>
<p>
    This is an app that will be used to keep track of/document projects that use a component based architecture.
    You will be able to create projects, and inside of those projects add files, where you can then document
    each and every component or file in the project.
</p>

<h2>Prerequisites:</h2>
<ol>
    <li>nvm (Node Version Manager)</li>
    <li>Node</li>
</ol>

<h2>How to Use:</h2>
<ol>
    <li>Clone/Fork this project.</li>
    <li>In the project root directory, create two new terminal instances.</li>
    <li>
        In each instance, run <code>nvm use</code>, this will find the node version to usein the .nvmrc for the project
    </li>
    <li>
        In each instance, run <code>npm install</code> to install all the relevant
        dependencies
    </li>
    <li>In the first instance <code>cd Client/</code> then run <code>npm run dev</code></li>
    <li>
        If there is an issue with <code>node-sass</code> on MacOS, run <code>npm rebuild node-sass</code>
    </li>
    <li>In the second instance <code>cd Server/</code> then run <code>npm run dev</code></li>
    <li>In each directory, (Client and Server) create an <code>.env</code></li>
    <li>In the Client directory, add <code>SERVER_URL=8080</code> to the <code>.env</code>file</li>
    <li>In the Server directory, add <code>PORT=8080</code> to the <code>.env</code> file</li>
</ol>
</div>
