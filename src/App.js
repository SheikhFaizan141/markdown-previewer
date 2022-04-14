import React from 'react';
import { marked } from 'marked';
import './App.css';
import Prism from 'prismjs';
import './Prism.css'

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: function (code) {
    console.log(code)
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const ToolBar = (props) => {
  // console.log(props)
  return (
    <header
      className='toolbar'
    // onClick={this.}
    >
      {props.heading}
      <i
        className={`${props.icon}`}
        onClick={props.handleClick}
      ></i>
    </header>
  )
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximized = this.handleEditorMaximized.bind(this);
    this.handlePreviewMaximized = this.handlePreviewMaximized.bind(this);
  }

  handleChange(e) {
    this.setState({ markdown: e.target.value })
  }

  handleEditorMaximized() {
    this.setState({ editorMaximized: !this.state.editorMaximized })
    console.log(this.state.editorMaximized)
  }

  handlePreviewMaximized() {
    this.setState({ previewMaximized: !this.state.previewMaximized })
    // console.log(this.state.previewMaximized)
  }

  render() {
    const classes = this.state.editorMaximized
      ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
      : this.state.previewMaximized
        ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
        : ['editorWrap', 'previewWrap', 'fa fa-maximize'];
    console.log(classes)

    return (
      <div id='wrapper'>
        <div
          id="editorWrap"
          className={`${classes[0]}`}
        >
          <ToolBar
            heading='Editor'
            handleClick={this.handleEditorMaximized}
            icon={classes[2]}
          />
          <textarea
            id='editor'
            type='text'
            value={this.state.markdown}
            onChange={this.handleChange}
          />
        </div>
        <div
          id="previewWrap"
          className={`${classes[1]}`}
        >
          <ToolBar
            heading='Previewer'
            handleClick={this.handlePreviewMaximized}
            icon={classes[2]}
          />
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked.parse(this.state.markdown)
            }}
          />
        </div>
      </div>
    )
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
export default App;
