/*Picture stores the width, heigth and pixel content of 
picture*/

class Picture {
  constructor(width, height, pixels) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  static empty(width, height, color) {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }
  pixel(x, y) {
    return this.pixels[x + y * this.width];
  }
  draw(pixels) {
    let copy = this.pixels.slice();
    for (let {x, y, color} of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }
}

function updateState(state, action) {
  return {...state, ...action};
}

///////////////////////DOM BUILDING//////////////////////
function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}
/*This extention assings propierties to DOM nodes, not attributer,
We cant use it to set arbitrary attributes, but to set propierties 
whose value is not a string, such as onclick, that can be set to register
a click event handler*/

//The Canvas//

const scale = 10;

/////////////Exercise 2: Efficient Drawing - Start//////////////////
/*
  -The actual implemetation repaint all the pixels on the
   canvas, event if is not necesary */ 
class PictureCanvas {
  constructor(picture, pointerDown) {
    this.dom = elt("canvas", {
      onmousedown: event => this.mouse(event, pointerDown),
      ontouchstart: event => this.touch(event, pointerDown)
    });
    this.syncState(picture);
  }

  //Change this method
  syncState(picture) {
    //Maneja que se dibuje solo cuando hay  la nueva picture 
    if (this.picture == picture) return;
    if (!this.picture){
      console.log("na hay picture inicial"); 
      this.picture = picture;
      drawPicture(this.picture,this.dom, scale); 
    }else{
      let newPicture = picture;
      
      updatePicture(this.picture, newPicture, this.dom, scale);
     
    
    }
    
  }
}

/*Sets the size of the canvas based on the scale and 
picture size and fills it whit a series of squares, one 
for each pixel*/

//You may want to use or change this as well

//Esto no funcionara de nada mientras que no logre 
function drawPicture(picture, canvas, scale) {
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let cx = canvas.getContext("2d");

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {

      
      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

function updatePicture(picture, picture2, canvas, scale){
  
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let cx = canvas.getContext("2d");
  

  for (let y = 0; y < picture2.height; y++) {
    for (let x = 0; x < picture2.width; x++) {

      if(picture.pixel(x,y) != picture2.pixel(x,y)){
        
        cx.fillStyle = picture2.pixel(x, y);
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
  
}

/////////////////Excersice-2-end///////////////////////////////////

PictureCanvas.prototype.mouse = function(downEvent, onDown) {
  if (downEvent.button != 0) return;
  let pos = pointerPosition(downEvent, this.dom);
  let onMove = onDown(pos);
  if (!onMove) return;
  let move = moveEvent => {
    if (moveEvent.buttons == 0) {
      this.dom.removeEventListener("mousemove", move);
    } else {
      let newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    }
  };
  this.dom.addEventListener("mousemove", move);
};

function pointerPosition(pos, domNode) {
  let rect = domNode.getBoundingClientRect();
  return {x: Math.floor((pos.clientX - rect.left) / scale),
          y: Math.floor((pos.clientY - rect.top) / scale)};
}

PictureCanvas.prototype.touch = function(startEvent,
                                         onDown) {
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  let onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;
  let move = moveEvent => {
    let newPos = pointerPosition(moveEvent.touches[0],
                                 this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };
  let end = () => {
    this.dom.removeEventListener("touchmove", move);
    this.dom.removeEventListener("touchend", end);
  };
  this.dom.addEventListener("touchmove", move);
  this.dom.addEventListener("touchend", end);
};

//The application - La aplicacion//
//Implement the main companent as a shell around a picture
//and a dinamic set of tools and controls that we pas to 
//its constructor.

/*Excercise 1
Add key shortcut CTRL-Z -- State: Acomplished
*/
class PixelEditor {
  constructor(state, config) {
    let {tools, controls, dispatch} = config;
    this.state = state;

    this.canvas = new PictureCanvas(state.picture, pos => {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);
      if (onMove) return pos => onMove(pos, this.state);
    });
    this.controls = controls.map(
      Control => new Control(state, config));
    this.dom = elt("div", {
      tabIndex: 0,
      onkeydown: event => this.keyDown(event,config)

    }, this.canvas.dom, elt("br"),
                   ...this.controls.reduce(
                     (a, c) => a.concat(" ", c.dom), []));
                   
  }

  keyDown(event, config){
    if(event.code == 'KeyZ' && (event.ctrlKey || event.metaKey )){
      let {dispatch} = config;
      dispatch({undo : true });
    }
  }

  syncState(state) {
    this.state = state;
    this.canvas.syncState(state.picture);
    for (let ctrl of this.controls) ctrl.syncState(state);
  }
}

class ToolSelect {
  constructor(state, {tools, dispatch}) {
    this.select = elt("select", {
      onchange: () => dispatch({tool: this.select.value})
    }, ...Object.keys(tools).map(name => elt("option", {
      selected: name == state.tool
    }, name)));
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }
  syncState(state) { this.select.value = state.tool; }
}

class ColorSelect {
  constructor(state, {dispatch}) {
    this.input = elt("input", {
      type: "color",
      value: state.color,
      onchange: () => dispatch({color: this.input.value})
    });
    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  syncState(state) { this.input.value = state.color; }
}

//////////DrawingTools////////////
function draw(pos, state, dispatch) {
  function drawPixel({x, y}, state) {
    let drawn = {x, y, color: state.color};
    dispatch({picture: state.picture.draw([drawn])});
  }
  drawPixel(pos, state);
  return drawPixel;
}

function rectangle(start, state, dispatch) {
  function drawRectangle(pos) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawRectangle(start);
  return drawRectangle;
}
////////Ejercicio 3 ////////// Draw a circle
function circle(center, state, dispatch) {
  function drawCircle(pos) {

    let xCenter =  center.x; 
    let yCenter = center.y;
    
    let xActual =  pos.x;
    let yActual = pos.y;

    let radio = Math.floor(getRatio(xCenter, yCenter ,xActual , yActual));
    let drawn = [];
    
    //drawn.push({xCenter, yCenter, color: state.color});
    
    let supy = yCenter + radio;
    let miny = yCenter - radio;
    let supx = xCenter + radio;
    let minx = xCenter - radio; 
    

    for (let y = miny; y <= supy; y++) {
      for(let x = minx; x <= supx; x++){

        let pointRadio = Math.floor(getRatio(xCenter, yCenter ,x, y));
        
        if (pointRadio <= radio){
          drawn.push({x,y, color: state.color});
        }
        
        

      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }

  function getRatio(x1,y1,x2,y2){
      const deltaX = x2 - x1;
      const deltay = y2 - y1;
      return Math.sqrt(deltaX * deltaX + deltay * deltay) 

  }
  drawCircle(center);
  return drawCircle;
  
}

const around = [{dx: -1, dy: 0}, {dx: 1, dy: 0},
                {dx: 0, dy: -1}, {dx: 0, dy: 1}];

function fill({x, y}, state, dispatch) {
  let targetColor = state.picture.pixel(x, y);
  let drawn = [{x, y, color: state.color}];
  let visited = new Set();
  for (let done = 0; done < drawn.length; done++) {
    for (let {dx, dy} of around) {
      let x = drawn[done].x + dx, y = drawn[done].y + dy;
      if (x >= 0 && x < state.picture.width &&
          y >= 0 && y < state.picture.height &&
          !visited.has(x + "," + y) &&
          state.picture.pixel(x, y) == targetColor) {
        drawn.push({x, y, color: state.color});
        visited.add(x + "," + y);
      }
    }
  }
  dispatch({picture: state.picture.draw(drawn)});
}

function pick(pos, state, dispatch){
    dispatch({color: state.picture.pixel(pos.x, pos.y)});
}

//Saving and Loading
//Control to save the current picture as an imagefile

class SaveButton{
    constructor(state){
        this.picture = state.picture;
        this.dom = elt("button", {
            onclick: () => this.save()
        },"💾 Save");
    }
    save(){
        let canvas = elt("canvas");
        drawPicture(this.picture, canvas, 1);
        let link = elt("a", {
            href: canvas.toDataURL(),
            download: "pixelart.png"
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state){this.picture = state.picture};
}

class LoadButton {
  constructor(_, {dispatch}) {
    this.dom = elt("button", {
      onclick: () => startLoad(dispatch)
    }, "📁 Load");
  }
  syncState() {}
}

function startLoad(dispatch) {
  let input = elt("input", {
    type: "file",
    onchange: () => finishLoad(input.files[0], dispatch)
  });
  document.body.appendChild(input);
  input.click();
  input.remove();
}

function finishLoad(file, dispatch) {
  if (file == null) return;
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    let image = elt("img", {
      onload: () => dispatch({
        picture: pictureFromImage(image)
      }),
      src: reader.result
    });
  });
  reader.readAsDataURL(file);
}

function pictureFromImage(image) {
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = elt("canvas", {width, height});
  let cx = canvas.getContext("2d");
  cx.drawImage(image, 0, 0);
  let pixels = [];
  let {data} = cx.getImageData(0, 0, width, height);

  function hex(n) {
    return n.toString(16).padStart(2, "0");
  }
  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}

// Undo History
function historyUpdateState(state, action) {
  if (action.undo == true) {
    if (state.done.length == 0) return state;
    return {
      ...state,
      picture: state.done[0],
      done: state.done.slice(1),
      doneAt: 0
    };
  } else if (action.picture &&
             state.doneAt < Date.now() - 1000) {
    return {
      ...state,
      ...action,
      done: [state.picture, ...state.done],
      doneAt: Date.now()
    };
  } else {
    return {...state, ...action};
  }
}

class UndoButton {
  constructor(state, {dispatch}) {
    this.dom = elt("button", {
      onclick: () => dispatch({undo: true}),
      disabled: state.done.length == 0
    }, "⮪ Undo");
  }
  syncState(state) {
    this.dom.disabled = state.done.length == 0;
  }
}

const startState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(600, 300, "#f0f0f0"),
  done: [],
  doneAt: [0]
};

const baseTools = {draw, fill, rectangle, pick};

const baseControls = [
  ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

function startPixelEditor({state = startState,
  tools = baseTools,
  controls = baseControls}){
    let app = new PixelEditor(state, {
      tools,
      controls,
      dispatch(action){
        state = historyUpdateState(state, action);
        app.syncState(state);
      }
    });
    return app.dom;

  }
