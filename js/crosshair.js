// Crosshair element (create dynamically)
const crosshair = document.createElement('div');
crosshair.id = 'crosshair';
crosshair.style.position = 'absolute';
crosshair.style.left = '50%';
crosshair.style.top = '50%';
crosshair.style.transform = 'translate(-50%, -50%)';
crosshair.style.pointerEvents = 'none'; // Prevent interference with clicks
crosshair.style.display = 'none'; // Hidden by default

// Container for the crosshair
crosshair.style.width = '40px'; // Size of the square
crosshair.style.height = '40px';
crosshair.style.background = 'transparent';

// Square outline (without a full border, we'll use brackets)
const square = document.createElement('div');
square.style.position = 'absolute';
square.style.width = '100%';
square.style.height = '100%';
square.style.background = 'transparent';

// Corner brackets (L-shaped)
const bracketWidth = '8px'; // Length of each bracket arm
const bracketHeight = '3px'; // Length of each bracket arm
const bracketThickness = '2px';
const bracketColor = '#00FF00'; // Green to match the image

// Top-left bracket
const topLeftBracket = document.createElement('div');
topLeftBracket.style.position = 'absolute';
topLeftBracket.style.top = '2px';
topLeftBracket.style.left = '2px';
topLeftBracket.style.width = bracketWidth;
topLeftBracket.style.height = bracketHeight;
topLeftBracket.style.borderTop = `${bracketThickness} solid ${bracketColor}`;
topLeftBracket.style.borderLeft = `${bracketThickness} solid ${bracketColor}`;
square.appendChild(topLeftBracket);

// Top-right bracket
const topRightBracket = document.createElement('div');
topRightBracket.style.position = 'absolute';
topRightBracket.style.top = '2px';
topRightBracket.style.right = '2px';
topRightBracket.style.width = bracketWidth;
topRightBracket.style.height = bracketHeight;
topRightBracket.style.borderTop = `${bracketThickness} solid ${bracketColor}`;
topRightBracket.style.borderRight = `${bracketThickness} solid ${bracketColor}`;
square.appendChild(topRightBracket);

// Bottom-left bracket
const bottomLeftBracket = document.createElement('div');
bottomLeftBracket.style.position = 'absolute';
bottomLeftBracket.style.bottom = '2px';
bottomLeftBracket.style.left = '2px';
bottomLeftBracket.style.width = bracketWidth;
bottomLeftBracket.style.height = bracketHeight;
bottomLeftBracket.style.borderBottom = `${bracketThickness} solid ${bracketColor}`;
bottomLeftBracket.style.borderLeft = `${bracketThickness} solid ${bracketColor}`;
square.appendChild(bottomLeftBracket);

// Bottom-right bracket
const bottomRightBracket = document.createElement('div');
bottomRightBracket.style.position = 'absolute';
bottomRightBracket.style.bottom = '2px';
bottomRightBracket.style.right = '2px';
bottomRightBracket.style.width = bracketWidth;
bottomRightBracket.style.height = bracketHeight;
bottomRightBracket.style.borderBottom = `${bracketThickness} solid ${bracketColor}`;
bottomRightBracket.style.borderRight = `${bracketThickness} solid ${bracketColor}`; // Fixed
square.appendChild(bottomRightBracket);

// 'T' lines at midpoints
const tLineLength = '8px'; // Length of the T line extending outward
const tLineTBarLength = '6px';
const tLineThickness = '2px';
const tLineColor = '#00FF00';

// Top T
const topT = document.createElement('div');
topT.style.position = 'absolute';
topT.style.top = '0';
topT.style.left = '50%';
topT.style.transform = 'translateX(-50%)';
topT.style.width = tLineThickness;
topT.style.height = tLineLength;
topT.style.background = tLineColor;
square.appendChild(topT);


const topTBar = document.createElement('div');
topTBar.style.position = 'absolute';
topTBar.style.top = '0';
topTBar.style.left = '50%';
topTBar.style.transform = 'translateX(-50%)';
topTBar.style.width = tLineTBarLength;
topTBar.style.height = tLineThickness;
topTBar.style.background = tLineColor;
square.appendChild(topTBar);

// Bottom T
const bottomT = document.createElement('div');
bottomT.style.position = 'absolute';
bottomT.style.bottom = '0';
bottomT.style.left = '50%';
bottomT.style.transform = 'translateX(-50%)';
bottomT.style.width = tLineThickness;
bottomT.style.height = tLineLength;
bottomT.style.background = tLineColor;
square.appendChild(bottomT);

const bottomTBar = document.createElement('div');
bottomTBar.style.position = 'absolute';
bottomTBar.style.bottom = '0';
bottomTBar.style.left = '50%';
bottomTBar.style.transform = 'translateX(-50%)';
bottomTBar.style.width = tLineTBarLength;
bottomTBar.style.height = tLineThickness;
bottomTBar.style.background = tLineColor;
square.appendChild(bottomTBar);

// Left T
const leftT = document.createElement('div');
leftT.style.position = 'absolute';
leftT.style.left = '0';
leftT.style.top = '50%';
leftT.style.transform = 'translateY(-50%)';
leftT.style.width = tLineLength;
leftT.style.height = tLineThickness;
leftT.style.background = tLineColor;
square.appendChild(leftT);

const leftTBar = document.createElement('div');
leftTBar.style.position = 'absolute';
leftTBar.style.left = '0';
leftTBar.style.top = '50%';
leftTBar.style.transform = 'translateY(-50%)';
leftTBar.style.width = tLineThickness;
leftTBar.style.height = tLineTBarLength;
leftTBar.style.background = tLineColor;
square.appendChild(leftTBar);

// Right T
const rightT = document.createElement('div');
rightT.style.position = 'absolute';
rightT.style.right = '0';
rightT.style.top = '50%'; // Fixed
rightT.style.transform = 'translateY(-50%)';
rightT.style.width = tLineLength;
rightT.style.height = tLineThickness;
rightT.style.background = tLineColor;
square.appendChild(rightT);

const rightTBar = document.createElement('div');
rightTBar.style.position = 'absolute';
rightTBar.style.right = '0';
rightTBar.style.top = '50%';
rightTBar.style.transform = 'translateY(-50%)';
rightTBar.style.width = tLineThickness;
rightTBar.style.height = tLineTBarLength;
rightTBar.style.background = tLineColor;
square.appendChild(rightTBar);

// Center dot
const centerDot = document.createElement('div');
centerDot.style.position = 'absolute';
centerDot.style.left = '50%';
centerDot.style.top = '50%';
centerDot.style.transform = 'translate(-50%, -50%)';
centerDot.style.width = '4px';
centerDot.style.height = '4px';
centerDot.style.background = bracketColor;
centerDot.style.borderRadius = '50%';
square.appendChild(centerDot);

crosshair.appendChild(square);
document.body.appendChild(crosshair);