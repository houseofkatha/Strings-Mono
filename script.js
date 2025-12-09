let text1;
let fontSize = 40;
let tracking = 10;
let leading = 20;
let weight1 = 1;
let weight2 = 6;
let detLevel1 = 5;
let detLevel2 = 5;
let affectRadius = 800;
let interact = "default";
let record = false;

let time = 0;

let baseCol = [255, 187, 0];
let tarCol = [222, 23, 108];
let intBaseCol = [255, 187, 0];
let intTarCol = [222, 23, 108];

const infoButton = document.getElementById('info-button');
const infoText = document.getElementById('info-text');
const widthNumberInput = document.getElementById('width');
const widthRangeSlider = document.getElementById('width-slider');
const letterNumberInput = document.getElementById('letter-spacing');
const letterRangeSlider = document.getElementById('letter-slider');
const lineNumberInput = document.getElementById('line-spacing');
const lineRangeSlider = document.getElementById('line-slider');

infoButton.addEventListener('click', () => {
  if(infoText.classList.contains('hide')) {
    infoText.classList.remove('hide');
  } else {
    infoText.classList.add('hide');
  }
});


  // When slider changes, update number input
  widthRangeSlider.addEventListener('input', () => {
    widthNumberInput.value = widthRangeSlider.value;
  });

  letterRangeSlider.addEventListener('input', () => {
    
    letterNumberInput.value = letterRangeSlider.value;
    
  });

  lineRangeSlider.addEventListener('input', () => {
    lineNumberInput.value = lineRangeSlider.value;
  });

  // Optional: When number input changes, update slider
  widthNumberInput.addEventListener('input', () => {
    widthRangeSlider.value = widthNumberInput.value;
    
  });

  letterNumberInput.addEventListener('input', () => {
    
    letterRangeSlider.value = letterNumberInput.value;
    
  });

  lineNumberInput.addEventListener('input', () => {
    
    lineRangeSlider.value = lineNumberInput.value;
  });

const hoverBtn = document.getElementById('hover-btn');
const breatheBtn = document.getElementById('breathe-btn');

// hoverBtn.addEventListener('click', () => {
//   hoverBtn.classList.toggle('active');
// });

// breatheBtn.addEventListener('click', () => {
//   breatheBtn.classList.toggle('active');
// });

hoverBtn.addEventListener('click', () => {
  hoverBtn.classList.toggle('active');
    if (hoverBtn.classList.contains('active')) {
      breatheBtn.classList.remove('active');
      interact = "hover-reactive";
    } else {
      interact = "default";
    }
  });

  breatheBtn.addEventListener('click', () => {
    breatheBtn.classList.toggle('active');
    if (breatheBtn.classList.contains('active')) {
      hoverBtn.classList.remove('active');
      interact = "breathe";
    } else {
      interact = "default";
    }
  });

const inputs = document.querySelectorAll('.spec-box .spec-value');

inputs.forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
  });
});

let firstWeight = document.getElementById('weight');
let firstDetail = document.getElementById('detail');
let secWeight = document.getElementById('weight2');
let secDetail = document.getElementById('detail2');
const secondSpec = document.getElementById('second-spec');
const arrow = document.getElementById('arrow');
let radiusInput = document.getElementById('radius');
let col1 = document.getElementById('colour1'); 
let col2 = document.getElementById('colour2'); 

document.getElementById('label').innerText = "\u00A0"; // non-breaking space
document.getElementById('label2').innerText = "\u00A0"; // non-breaking space

firstWeight.addEventListener('focus', () => {
    document.getElementById('label').innerText = "stroke weight";
  });

firstWeight.addEventListener('blur', () => {
    document.getElementById('label').innerText = "\u00A0";
  });

firstDetail.addEventListener('focus', () => {
    document.getElementById('label').innerText = "detail level";
  });

firstDetail.addEventListener('blur', () => {
    document.getElementById('label').innerText = "\u00A0";
  });

secWeight.addEventListener('focus', () => {
    document.getElementById('label2').innerText = "stroke weight";
  });

secWeight.addEventListener('blur', () => {
    document.getElementById('label2').innerText = "\u00A0";
  });

secDetail.addEventListener('focus', () => {
    document.getElementById('label2').innerText = "detail level";
  });

secDetail.addEventListener('blur', () => {
    document.getElementById('label2').innerText = "\u00A0";
  });

col1.addEventListener('click', () => {
    document.getElementById('colour-options-1').classList.toggle('hide');
});

col2.addEventListener('click', () => {
    document.getElementById('colour-options-2').classList.toggle('hide');
});

document.getElementById('col1').addEventListener('click', () => {
    baseCol = [255, 187, 0];
    tarCol = [222, 23, 108];

    document.getElementById('col1').classList.add('focused');
    document.getElementById('col2').classList.remove('focused');
    document.getElementById('col3').classList.remove('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.remove('focused');
    document.getElementById('col6').classList.remove('focused');
    document.getElementById('col7').classList.remove('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour1').style.backgroundImage = 'linear-gradient(to right, #ffbb00, #de176c)';
});

document.getElementById('col2').addEventListener('click', () => {
    baseCol = [244, 110, 1];
    tarCol = [140, 59, 244];

    document.getElementById('col1').classList.remove('focused');
    document.getElementById('col2').classList.add('focused');
    document.getElementById('col3').classList.remove('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.remove('focused');
    document.getElementById('col6').classList.remove('focused');
    document.getElementById('col7').classList.remove('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour1').style.backgroundImage = 'linear-gradient(to right, #f46e01, #8c3bf4)';
});

document.getElementById('col3').addEventListener('click', () => {
    baseCol = [34, 43, 0];
    tarCol = [169, 212, 0];

    document.getElementById('col1').classList.remove('focused');
    document.getElementById('col2').classList.remove('focused');
    document.getElementById('col3').classList.add('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.remove('focused');
    document.getElementById('col6').classList.remove('focused');
    document.getElementById('col7').classList.remove('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour1').style.backgroundImage = 'linear-gradient(to right, #222b00, #a9d400)';
});

// document.getElementById('col4').addEventListener('click', () => {
//     baseCol = [65, 77, 11];
//     tarCol = [114, 122, 23];

//     document.getElementById('col1').classList.remove('focused');
//     document.getElementById('col2').classList.remove('focused');
//     document.getElementById('col3').classList.remove('focused');
//     document.getElementById('col4').classList.add('focused');
//     document.getElementById('col5').classList.remove('focused');
//     document.getElementById('col6').classList.remove('focused');
//     document.getElementById('col7').classList.remove('focused');
//     document.getElementById('col8').classList.remove('focused');

//     document.getElementById('colour1').style.backgroundImage = 'linear-gradient(to right, #414d0b, #727a17)';
// });

document.getElementById('col5').addEventListener('click', () => {
    intBaseCol = [255, 187, 0];
    intTarCol = [222, 23, 108];

    document.getElementById('col1').classList.remove('focused');
    document.getElementById('col2').classList.remove('focused');
    document.getElementById('col3').classList.remove('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.add('focused');
    document.getElementById('col6').classList.remove('focused');
    document.getElementById('col7').classList.remove('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour2').style.backgroundImage = 'linear-gradient(to right, #ffbb00, #de176c)';
});

document.getElementById('col6').addEventListener('click', () => {
    intBaseCol = [244, 110, 1];
    intTarCol = [140, 59, 244];

    document.getElementById('col1').classList.remove('focused');
    document.getElementById('col2').classList.remove('focused');
    document.getElementById('col3').classList.remove('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.remove('focused');
    document.getElementById('col6').classList.add('focused');
    document.getElementById('col7').classList.remove('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour2').style.backgroundImage = 'linear-gradient(to right, #f46e01, #8c3bf4)';
});

document.getElementById('col7').addEventListener('click', () => {
    intBaseCol = [34, 43, 0];
    intTarCol = [169, 212, 0];

    document.getElementById('col1').classList.remove('focused');
    document.getElementById('col2').classList.remove('focused');
    document.getElementById('col3').classList.remove('focused');
    // document.getElementById('col4').classList.remove('focused');
    document.getElementById('col5').classList.remove('focused');
    document.getElementById('col6').classList.remove('focused');
    document.getElementById('col7').classList.add('focused');
    // document.getElementById('col8').classList.remove('focused');

    document.getElementById('colour2').style.backgroundImage = 'linear-gradient(to right, #222b00, #a9d400)';
});

// document.getElementById('col8').addEventListener('click', () => {
//     intBaseCol = [65, 77, 11];
//     intTarCol = [114, 122, 23];

//     document.getElementById('col1').classList.remove('focused');
//     document.getElementById('col2').classList.remove('focused');
//     document.getElementById('col3').classList.remove('focused');
//     document.getElementById('col4').classList.remove('focused');
//     document.getElementById('col5').classList.remove('focused');
//     document.getElementById('col6').classList.remove('focused');
//     document.getElementById('col7').classList.remove('focused');
//     document.getElementById('col8').classList.add('focused');

//     document.getElementById('colour1').style.backgroundImage = 'linear-gradient(to right, #414d0b, #727a17)';
// });


function setup() {
  
  // container = document.getElementById('canvas-container');

  // Create canvas that matches container size
  //createCanvas(container.clientWidth, container.clientHeight).parent(container);
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);
  let col = color(0, 0, 0);
  // background('#F6F8F7');

  // console.log(container.clientHeight);

  text1 = ""
}

function draw() {
  background('white');

  fontSize = parseFloat(widthNumberInput.value);
  tracking = parseFloat(letterNumberInput.value);
  leading = parseFloat(lineNumberInput.value);
  weight1 = parseFloat(firstWeight.value) || 0;
  detLevel1 = parseFloat(firstDetail.value) || 0;
  weight2 = parseFloat(secWeight.value) || 0;
  detLevel2 = parseFloat(secDetail.value) || 0;
  affectRadius = parseFloat(radius.value) || 0;

  text1 = document.getElementById('text-input').value;


  

  

  if (interact === "hover-reactive") {
    // secondSpec.classList.add('show');
    secondSpec.classList.remove('hide');
    arrow.classList.remove('hide');
    radiusInput.classList.remove('hide');
    document.getElementById('hid-colour-2').classList.remove('hide');
  } else {
    secondSpec.classList.add('hide');
    arrow.classList.add('hide');
    radiusInput.classList.add('hide');
    document.getElementById('hid-colour-2').classList.add('hide');
  }

  drawCustomText(text1, 30, 40, {
    letterWidth: fontSize,
    letterSpacing: tracking,
    lineSpacing: leading,
    strokeWeightVal: weight1,
    detailLevel: detLevel1,
    
    color: [255, 240, 255],
    // color: [100, 100, 100],
    preset: interact,
    radius: affectRadius,
    interactiveStrokeWeight: weight2,
    interactiveDetailLevel: detLevel2,
    //interactiveColor: [270, 3, 24],
    baseColor: baseCol,
    targetColor: tarCol,
    interactiveBaseColor: intBaseCol,
    interactiveTargetColor: intTarCol
  });

//   if(record) {
//     record= false;
//     save("textSVG.svg");
//   }

time += 0.02;
}


// document.querySelector('.save').addEventListener('click', () => {
//     record = true;
// })

function windowResized() {
  // Resize canvas when window resizes
  // resizeCanvas(container.clientWidth, container.clientHeight);
  resizeCanvas(windowWidth, windowHeight);
}

document.querySelectorAll('.spec-box').forEach(box => {
  const dragHandle = box.querySelector('div'); // the "⬤"
  const input = box.querySelector('input');

  let startX = 0;
  let startVal = 0;
  let dragging = false;

  dragHandle.style.cursor = 'ew-resize';

  dragHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX;
    startVal = parseFloat(input.value);
    dragging = true;

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ew-resize'; // ⬅️ Set cursor while dragging

    const min = parseFloat(input.min);
    const max = parseFloat(input.max);

    const onMouseMove = (e) => {
      if (!dragging) return;

      let deltaX = e.clientX - startX;
      let sensitivity = 1;

      let newVal = startVal + deltaX * sensitivity;
      newVal = Math.round(newVal * 10) / 10;
      newVal = Math.max(min, Math.min(max, newVal));

      input.value = newVal;
      input.dispatchEvent(new Event('input'));
    };

    const onMouseUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = ''; // ⬅️ Restore cursor
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});


