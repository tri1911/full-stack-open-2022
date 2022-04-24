## 0.4: New Note

```
title 0.4: Add a New Note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note with the data inside of body { note: "something" }

note over server:
server receive the new note data,
then add into the notes list (within the server)
end note

server-->browser: respond with a redirect to instruct the browser to reload the Notes page

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

## 0.5: Single page app

```
title 0.5: Single page app

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

```

## 0.6: New note

```
title 0.6: New note

note over browser:
browser executes the submit event handler of the form
which creates new note, add into the current "notes" list,
re-render notes to display the updated notes
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (attached data: { content: "HTML is easy", date: "2019-05-23" } in the body)

note over server:
server receive the note data
add new note into the list of notes in the server
end note

server-->browser: send response { message: 'note created' }

```
