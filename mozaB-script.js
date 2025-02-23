const ledDisplay = document.getElementById("ledDisplay");
        const cols = 140;
        const rows = 24;
        const alignments = ["left", "center", "right"];
        let currentAlignments = [0, 0, 0]; // 0 - lewo, 1 - środek, 2 - prawo
        let invertedRows = [false, false, false]; // Śledzenie inwersji dla każdego wiersza
        let isFullScreenInverted = false; // Globalna inwersja całego wyświetlacza

        const charMap = {
    "A": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "111111",
        "110011",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "B": [
        "000000",
        "111110",
        "110011",
        "110011",
        "110011",
        "111110",
        "110011",
        "110011",
        "110011",
        "111110",
        "000000",
        "000000"
    ],
    "C": [
        "000000",
        "011110",
        "110011",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "D": [
        "000000",
        "111110",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "111110",
        "000000",
        "000000"
    ],
    "E": [
        "000000",
        "111111",
        "110000",
        "110000",
        "110000",
        "111100",
        "110000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "F": [
        "000000",
        "111111",
        "110000",
        "110000",
        "110000",
        "111100",
        "110000",
        "110000",
        "110000",
        "110000",
        "000000",
        "000000"
    ],
    "G": [
        "000000",
        "011110",
        "110011",
        "110000",
        "110000",
        "110111",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "H": [
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "111111",
        "110011",
        "110011",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "I": [
        "00",
        "11",
        "11",
        "11",
        "11",
        "11",
        "11",
        "11",
        "11",
        "11",
        "00",
        "00"
    ],
    "J": [
        "000000",
        "111111",
        "000011",
        "000011",
        "000011",
        "000011",
        "000011",
        "000011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "K": [
        "000000",
        "110011",
        "110011",
        "110110",
        "111100",
        "111000",
        "111100",
        "110110",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "L": [
        "000000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "M": [
        "0000000",
        "1100011",
        "1110111",
        "1111111",
        "1101011",
        "1101011",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "0000000",
        "0000000"
    ],
    "N": [
        "0000000",
        "1100011",
        "1110011",
        "1110011",
        "1111011",
        "1101011",
        "1101111",
        "1100111",
        "1100111",
        "1100011",
        "0000000",
        "0000000"
    ],
    "O": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "P": [
        "000000",
        "111110",
        "110011",
        "110011",
        "110011",
        "111110",
        "110000",
        "110000",
        "110000",
        "110000",
        "000000",
        "000000"
    ],
    "Q": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110101",
        "110010",
        "011101",
        "000000",
        "000000"
    ],
    "R": [
        "000000",
        "111110",
        "110011",
        "110011",
        "110011",
        "111110",
        "111100",
        "110110",
        "110110",
        "110011",
        "000000",
        "000000"
    ],
    "S": [
        "000000",
        "011111",
        "110000",
        "110000",
        "011000",
        "001100",
        "000110",
        "000011",
        "000011",
        "111110",
        "000000",
        "000000"
    ],
    "T": [
        "000000",
        "111111",
        "001100",
        "001100",
        "001100",
        "001100",
        "001100",
        "001100",
        "001100",
        "001100",
        "000000",
        "000000"
    ],
    "U": [
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "V": [
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "001100",
        "000000",
        "000000"
    ],
    "W": [
        "0000000",
        "1100011",
        "1100011",
        "1100011",
        "1100011",
        "1101011",
        "1101011",
        "1111111",
        "1110111",
        "1100011",
        "0000000",
        "0000000"
    ],
    "X": [
        "0000000",
        "1100011",
        "1100011",
        "1100011",
        "0110110",
        "0011100",
        "0110110",
        "1100011",
        "1100011",
        "1100011",
        "0000000",
        "0000000"
    ],
    "Y": [
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "001100",
        "001100",
        "001100",
        "001100",
        "000000",
        "000000"
    ],
    "Z": [
        "000000",
        "111111",
        "000011",
        "000011",
        "000110",
        "001100",
        "011000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "a": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "000011",
        "011111",
        "110011",
        "110011",
        "011111",
        "000000",
        "000000"
    ],
    "b": [
        "000000",
        "110000",
        "110000",
        "110000",
        "111110",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "c": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "110011",
        "110000",
        "110000",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "d": [
        "000000",
        "000011",
        "000011",
        "000011",
        "011111",
        "110011",
        "110011",
        "110011",
        "110011",
        "011111",
        "000000",
        "000000"
    ],
    "e": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "110011",
        "110011",
        "111110",
        "110000",
        "011110",
        "000000",
        "000000"
    ],
    "f": [
        "00000",
        "00111",
        "01100",
        "01100",
        "01100",
        "11110",
        "01100",
        "01100",
        "01100",
        "01100",
        "01100",
        "01100"
    ],
    "g": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011111",
        "110011",
        "110011",
        "110011",
        "011111",
        "000011",
        "000011",
        "011110"
    ],
    "h": [
        "000000",
        "110000",
        "110000",
        "110000",
        "111110",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "i": [
        "000",
        "110",
        "000",
        "000",
        "110",
        "110",
        "110",
        "110",
        "110",
        "011",
        "000",
        "000"
    ],
    "j": [
        "000",
        "011",
        "000",
        "000",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "110"
    ],
    "k": [
        "000000",
        "110000",
        "110000",
        "110000",
        "110011",
        "110110",
        "111100",
        "111100",
        "110110",
        "110011",
        "000000",
        "000000"
    ],
    "l": [
        "000",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "011",
        "000",
        "000"
    ],
    "m": [
        "00000000",
        "00000000",
        "00000000",
        "00000000",
        "11101110",
        "11011011",
        "11011011",
        "11011011",
        "11011011",
        "11011011",
        "00000000",
        "00000000"
    ],
    "n": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110110",
        "111011",
        "110011",
        "110011",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "o": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "p": [
        "000000",
        "000000",
        "000000",
        "000000",
        "111110",
        "110011",
        "110011",
        "110011",
        "111110",
        "110000",
        "110000",
        "110000"
    ],
    "q": [
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "0111110",
        "1100110",
        "1100110",
        "1100110",
        "0111110",
        "0000110",
        "0000111",
        "0000110"
    ],
    "r": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110110",
        "111011",
        "110000",
        "110000",
        "110000",
        "110000",
        "000000",
        "000000"
    ],
    "s": [
        "00000",
        "00000",
        "00000",
        "00000",
        "01111",
        "11000",
        "01100",
        "00110",
        "00011",
        "11110",
        "00000",
        "00000"
    ],
    "t": [
        "00000",
        "01100",
        "01100",
        "01100",
        "11110",
        "01100",
        "01100",
        "01100",
        "01100",
        "00111",
        "00000",
        "00000"
    ],
    "u": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "110111",
        "011011",
        "000000",
        "000000"
    ],
    "v": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "001100",
        "000000",
        "000000"
    ],
    "w": [
        "0000000",
        "0000000",
        "0000000",
        "0000000",
        "1100011",
        "1100011",
        "1101011",
        "1111111",
        "1110111",
        "1100011",
        "0000000",
        "0000000"
    ],
    "x": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110011",
        "110011",
        "011110",
        "011110",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "y": [
        "000000",
        "000000",
        "000000",
        "000000",
        "110011",
        "110011",
        "110011",
        "110011",
        "011111",
        "000011",
        "000011",
        "011110"
    ],
    "z": [
        "00000",
        "00000",
        "00000",
        "00000",
        "11111",
        "00011",
        "00110",
        "01100",
        "11000",
        "11111",
        "00000",
        "00000"
    ],
    "\u0104": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "111111",
        "110011",
        "110011",
        "110010",
        "000011",
        "000000"
    ],
    "\u0106": [
        "000010",
        "011110",
        "110111",
        "110000",
        "110000",
        "110000",
        "110000",
        "110000",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "\u0118": [
        "000000",
        "111111",
        "110000",
        "110000",
        "110000",
        "111100",
        "110000",
        "110000",
        "110000",
        "111111",
        "001000",
        "001100"
    ],
    "\u0141": [
        "000000",
        "110000",
        "110000",
        "110000",
        "110100",
        "111000",
        "110000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "\u0143": [
        "0000100",
        "1101011",
        "1110011",
        "1110011",
        "1111011",
        "1101011",
        "1101111",
        "1100111",
        "1100111",
        "1100011",
        "0000000",
        "0000000"
    ],
    "\u00d3": [
        "000100",
        "011110",
        "111011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "\u0179": [
        "000100",
        "111111",
        "001011",
        "000011",
        "000110",
        "001100",
        "011000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "\u017b": [
        "000000",
        "111111",
        "000011",
        "000011",
        "000110",
        "111111",
        "011000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "\u0105": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "000011",
        "011111",
        "110011",
        "110011",
        "011111",
        "000010",
        "000100"
    ],
    "\u0107": [
        "000000",
        "000010",
        "000100",
        "000000",
        "011110",
        "110011",
        "110000",
        "110000",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "\u0119": [
        "000000",
        "000000",
        "000000",
        "000000",
        "011110",
        "110011",
        "110011",
        "111110",
        "110000",
        "011110",
        "001000",
        "001100"
    ],
    "\u0142": [
        "0000",
        "0110",
        "0110",
        "0110",
        "0111",
        "0110",
        "1110",
        "0110",
        "0110",
        "0011",
        "0000",
        "0000"
    ],
    "\u0144": [
        "000000",
        "000010",
        "000100",
        "000000",
        "110110",
        "111011",
        "110011",
        "110011",
        "110011",
        "110011",
        "000000",
        "000000"
    ],
    "\u015b": [
        "00000",
        "00010",
        "00100",
        "00000",
        "01111",
        "11000",
        "01100",
        "00110",
        "00011",
        "11110",
        "00000",
        "00000"
    ],
    "\u017a": [
        "00000",
        "00010",
        "00100",
        "00000",
        "11111",
        "00011",
        "00110",
        "01100",
        "11000",
        "11111",
        "00000",
        "00000"
    ],
    "\u017c": [
        "00000",
        "00000",
        "00100",
        "00000",
        "11111",
        "00011",
        "00110",
        "01100",
        "11000",
        "11111",
        "00000",
        "00000"
    ],
    "\u00f3": [
        "000000",
        "000010",
        "000100",
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "\u015a": [
        "000010",
        "011111",
        "110100",
        "110000",
        "011000",
        "001100",
        "000110",
        "000011",
        "000011",
        "111110",
        "000000",
        "000000"
    ],
    "2": [
        "000000",
        "011110",
        "110011",
        "000011",
        "000110",
        "001100",
        "011000",
        "110000",
        "110000",
        "111111",
        "000000",
        "000000"
    ],
    "1": [
        "0000",
        "0011",
        "0111",
        "1111",
        "0011",
        "0011",
        "0011",
        "0011",
        "0011",
        "0011",
        "0000",
        "0000"
    ],
    "3": [
        "000000",
        "011110",
        "110011",
        "000011",
        "000011",
        "001110",
        "000011",
        "000011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "4": [
        "000000",
        "000011",
        "000111",
        "001111",
        "011011",
        "110011",
        "110011",
        "111111",
        "000011",
        "000011",
        "000000",
        "000000"
    ],
    "5": [
        "000000",
        "111111",
        "110000",
        "110000",
        "111110",
        "110011",
        "000011",
        "000011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "6": [
        "000000",
        "011110",
        "110011",
        "110000",
        "111110",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "7": [
        "000000",
        "111111",
        "000011",
        "000011",
        "000011",
        "000110",
        "001100",
        "001100",
        "001100",
        "001100",
        "000000",
        "000000"
    ],
    "8": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "011110",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "9": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "011111",
        "000011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "0": [
        "000000",
        "011110",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "110011",
        "011110",
        "000000",
        "000000"
    ],
    "-": [
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "11111",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000"
    ],
    "+": [
        "000000",
        "000000",
        "000000",
        "001100",
        "001100",
        "111111",
        "001100",
        "001100",
        "000000",
        "000000",
        "000000",
        "000000"
    ],
    "/": [
        "0000",
        "0011",
        "0011",
        "0011",
        "0110",
        "0110",
        "0110",
        "1100",
        "1100",
        "1100",
        "0000",
        "0000"
    ],
    ".": [
        "00",
        "00",
        "00",
        "00",
        "00",
        "00",
        "00",
        "00",
        "11",
        "11",
        "00",
        "00"
    ],
    ",": [
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "011",
        "011",
        "110",
        "000"
    ],
    "!": [
        "00",
        "11",
        "11",
        "11",
        "11",
        "11",
        "11",
        "00",
        "00",
        "11",
        "00",
        "00"
    ],
    ":": [
        "00",
        "00",
        "00",
        "11",
        "11",
        "00",
        "11",
        "11",
        "00",
        "00",
        "00",
        "00"
    ],
    "(": [
        "011",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "110",
        "011",
        "000"
    ],
    ")": [
        "110",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "011",
        "110",
        "000"
    ],
    "\"": [
        "00000",
        "11011",
        "11011",
        "10010",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000",
        "00000"
    ],
    "'": [
        "00",
        "11",
        "11",
        "10",
        "00",
        "00",
        "00",
        "00",
        "00",
        "00",
        "00",
        "00"
    ],
    " ": [
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000",
        "000"
    ],
    "@": [
        "000000",
        "000000",
        "000000",
        "000100",
        "000110",
        "111111",
        "000110",
        "000100",
        "000000",
        "000000",
        "000000",
        "000000"
    ]
};

function createPixels() {
    for (let i = 0; i < rows * cols; i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        ledDisplay.appendChild(pixel);
    }
}

function updateDisplay() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.classList.remove("lit"));

    const text1 = document.getElementById("hiddenText1").value;
    const text2 = document.getElementById("hiddenText2").value;
    const text3 = document.getElementById("hiddenText3").value;

    if (scrollingIntervals[0]) {
        renderRow(0, '', 0, currentAlignments[0], invertedRows[0]);
        renderText(scrollingTexts[0], 0, currentAlignments[0], invertedRows[0], scrollOffsets[0]);
    } else {
        renderRow(0, text1, 0, currentAlignments[0], invertedRows[0]);
        renderText(text1, 0, currentAlignments[0], invertedRows[0], 0);
    }

    if (scrollingIntervals[1]) {
        renderRow(1, '', 12, currentAlignments[1], invertedRows[1]);
        renderText(scrollingTexts[1], 12, currentAlignments[1], invertedRows[1], scrollOffsets[1]);
    } else {
        renderRow(1, text2, 12, currentAlignments[1], invertedRows[1]);
        renderText(text2, 12, currentAlignments[1], invertedRows[1], 0);
    }

    if (scrollingIntervals[2]) {
        renderRow(2, '', 6, currentAlignments[2], invertedRows[2]);
        renderText(scrollingTexts[2], 6, currentAlignments[2], invertedRows[2], scrollOffsets[2]);
    } else {
        renderRow(2, text3, 6, currentAlignments[2], invertedRows[2]);
        renderText(text3, 6, currentAlignments[2], invertedRows[2], 0);
    }

    if (isFullScreenInverted) {
        pixels.forEach(pixel => pixel.classList.toggle("lit"));
    }
}

// Funkcja do synchronizacji tekstu z widocznych inputów do ukrytych
function syncHiddenInputs() {
    document.getElementById("hiddenText1").value = document.getElementById("text1").value;
    document.getElementById("hiddenText2").value = document.getElementById("text2").value;
    document.getElementById("hiddenText3").value = document.getElementById("text3").value;
}

function getMaxVisibleChars(text) {
    let widthUsed = 0;
    let maxChars = 0;

    for (const char of text) {
        if (charMap[char]) {
            const charWidth = charMap[char][0].length + 1; // Szerokość znaku + odstęp
            if (widthUsed + charWidth > cols) break;
            widthUsed += charWidth;
            maxChars++;
        }
    }
    return maxChars;
}

function renderRow(rowIndex, text, rowOffset, alignment, invertRow) {
    if (invertRow && rowIndex !== 2) {
        invertWholeRow(rowOffset);
    }
    const maxChars = getMaxVisibleChars(text);
    renderText(text.slice(0, maxChars), rowOffset, alignment, invertRow);
}

function clearDisplay() {
    document.querySelectorAll(".pixel").forEach(pixel => pixel.classList.remove("lit"));
}

function renderText(text, rowOffset, alignment, invert, scrollOffset = 0) {
    let textWidth = text.split("").reduce((acc, char) => acc + (charMap[char] ? charMap[char][0].length + 1 : 0), 0);
    let colOffset = alignment === 1 ? Math.floor((140 - textWidth) / 2) + 1 :
                    alignment === 2 ? (140 - textWidth) : 1;

    colOffset = (colOffset - scrollOffset + 140) % 140; // Płynne przewijanie bez resetowania

    for (const char of text) {
        if (charMap[char]) {
            const charData = charMap[char];

            for (let row = 0; row < charData.length; row++) {
                for (let col = 0; col < charData[row].length; col++) {
                    let pixelCol = colOffset + col + rowOffset;

                    // Rysujemy tylko jeśli znak jest w granicach ekranu
                    if (pixelCol >= 1 && pixelCol < (cols - 1)) {
                        const index = (rowOffset + row) * cols + ((colOffset + col + cols) % cols);

                        if (index < rows * cols) {
                            const pixel = document.querySelectorAll(".pixel")[index];
                            const shouldBeLit = (charData[row][col] === "1") !== invert;

                            pixel.classList.toggle("lit", shouldBeLit);
                        }
                    }
                }
            }
            colOffset += charData[0].length + 1;
        }
    }
}


function invertWholeRow(rowOffset) {
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < 12; row++) {
            const index = (rowOffset + row) * cols + col;
            if (index < rows * cols) {
                document.querySelectorAll(".pixel")[index].classList.toggle("lit");
            }
        }
    }
}

// Funkcja zmieniająca wyrównanie
function toggleAlignment(row) {
    currentAlignments[row] = (currentAlignments[row] + 1) % 3;
    
    const icons = ["fa-align-left", "fa-align-center", "fa-align-right"];
    const button = document.querySelectorAll(".alignment-button")[row];

    // Usuń wszystkie ikony i dodaj nową
    button.classList.remove("fa-align-left", "fa-align-center", "fa-align-right");
    button.classList.add(icons[currentAlignments[row]]);
}

// Zmiana wyrównania tekstu jest teraz zatwierdzana dopiero po kliknięciu przycisku zatwierdzającego
document.querySelector(".zatwierdz").addEventListener("click", function() {
    updateDisplay();
});

function toggleInvert(row) {
    if (row === 2) {
        isFullScreenInverted = !isFullScreenInverted;
    } else {
        invertedRows[row] = !invertedRows[row];
    }

    // Pobranie odpowiedniego przycisku
    const buttons = document.querySelectorAll(".invert-button");
    const button = buttons[row];

    // Przełączanie ikon
    button.classList.toggle("fa-regular");
    button.classList.toggle("fa-solid");
}


function clearInputs() {
    document.getElementById("text1").value = "";
    document.getElementById("text2").value = "";
    document.getElementById("text3").value = "";

    syncHiddenInputs();
}

// document.addEventListener("DOMContentLoaded", () => {
//     // Funkcja do wyświetlenia "Dzień dobry" w 3 wierszu na 3 sekundy
//     function displayGreeting() {
//         const text3 = "Dzień dobry!";
//         const hiddenText3 = document.getElementById("hiddenText3");

//         // Ustawienie "Dzień dobry" w ukrytym inpucie
//         hiddenText3.value = text3;

//         // Wymuszenie wyśrodkowanego wyrównania dla 3 wiersza
//         currentAlignments[2] = 1; // 1 oznacza wyśrodkowanie (dla alignments 0: left, 1: center, 2: right)

//         // Odświeżenie wyświetlacza, aby wyświetlić "Dzień dobry"
//         updateDisplay();

//         // Ukrycie tekstu po 3 sekundach
//         setTimeout(() => {
//             hiddenText3.value = ""; // Wyczyść tekst
//             currentAlignments[2] = 0;
//             toggleInvert(2)
//             updateDisplay(); // Zaktualizuj wyświetlacz
//         }, 2000); // 3000ms = 3 sekundy
//     }

//     // Opóźnienie o 1 sekundę przed wywołaniem displayGreeting
//     setTimeout(() => {
//         toggleInvert(2)
//         displayGreeting();
//     }, 500); // 1000ms = 1 sekunda
// });

let isAutoMode = false; // Flaga trybu automatycznego
let savedText1 = ''; // Zmienna przechowująca zapisany tekst dla hiddenText1
let savedText2 = ''; // Zmienna przechowująca zapisany tekst dla hiddenText2
let savedAlignments = [0, 0, 0]; // Tablica do przechowywania wyrównań (1, 2, 3 wierszy)

// Funkcja do włączania/wyłączania trybu automatycznego
function toggleAutoMode() {
    isAutoMode = !isAutoMode;
    
    const buttonIcon = document.querySelector("#auto-mode-button i");
    
    // Zmieniamy ikonę przycisku
    if (isAutoMode) {
        buttonIcon.classList.remove("fa-user-pen");
        buttonIcon.classList.add("fa-clock");
        saveCurrentInputs(); // Zapisz aktualne wartości inputów przed włączeniem trybu
        saveCurrentAlignments(); // Zapisz aktualne wyrównania przed włączeniem trybu
        refreshAutoMode(); // Uruchamiamy cykliczne odświeżanie, jeśli tryb włączony
    } else {
        buttonIcon.classList.remove("fa-clock");
        buttonIcon.classList.add("fa-user-pen");
        clearAutoModeData(); // Usuwamy wyświetlany tekst i resetujemy ukryte inputy
        restoreSavedInputs(); // Przywracamy poprzednie wartości inputów
        restoreSavedAlignments(); // Przywracamy poprzednie wyrównania
    }

    // Odświeżenie wyświetlacza, aby zmiany były widoczne
    updateDisplay();
}

// Funkcja do wyświetlania czasu w trybie automatycznym
function updateAutoModeDisplay() {
    const hiddenText1 = document.getElementById("hiddenText1");
    const hiddenText2 = document.getElementById("hiddenText2");

    // Pobranie aktualnej daty i godziny
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const dayOfMonth = now.getDate();
    const dayOfWeek = now.toLocaleString('default', { weekday: 'long' });

    // Mapowanie na polskie nazwy miesięcy
    const monthNames = [
        "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", 
        "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
    ];
    const month = monthNames[now.getMonth()]; // Pełna nazwa miesiąca po polsku
    const year = now.getFullYear().toString().slice(2);

    // Aktualizacja tekstu
    hiddenText1.value = `${hours}:${minutes}`;
    hiddenText2.value = `${dayOfWeek}, ${dayOfMonth} ${month} '${year}`;

    // Wymuszenie wyśrodkowanego wyrównania
    currentAlignments[0] = 1;
    currentAlignments[1] = 1;
    updateDisplay(); // Odświeżamy wyświetlacz po ustawieniu tekstów
}

// Funkcja do odświeżania wyświetlacza co minutę, jeśli tryb automatyczny jest aktywowany
function refreshAutoMode() {
    if (isAutoMode) {
        updateAutoModeDisplay(); // Aktualizacja wyświetlacza
        setTimeout(refreshAutoMode, 30000); // Odświeżanie co minutę
    }
}

// Funkcja do czyszczenia wartości ukrytych inputów, kiedy tryb automatyczny jest wyłączony
function clearAutoModeData() {
    const hiddenText1 = document.getElementById("hiddenText1");
    const hiddenText2 = document.getElementById("hiddenText2");

    hiddenText1.value = "";
    hiddenText2.value = "";
    
    // Dodatkowo możemy wyczyścić wyświetlacz
    clearDisplay();
}

// Funkcja do zapisywania aktualnych wartości inputów
function saveCurrentInputs() {
    const hiddenText1 = document.getElementById("hiddenText1");
    const hiddenText2 = document.getElementById("hiddenText2");

    savedText1 = hiddenText1.value;
    savedText2 = hiddenText2.value;
}

// Funkcja do przywracania zapisanych wartości inputów
function restoreSavedInputs() {
    const hiddenText1 = document.getElementById("hiddenText1");
    const hiddenText2 = document.getElementById("hiddenText2");

    hiddenText1.value = savedText1;
    hiddenText2.value = savedText2;
}

// Funkcja do zapisywania aktualnych wyrównań
function saveCurrentAlignments() {
    savedAlignments[0] = currentAlignments[0];
    savedAlignments[1] = currentAlignments[1];
    savedAlignments[2] = currentAlignments[2];
}

// Funkcja do przywracania zapisanych wyrównań
function restoreSavedAlignments() {
    currentAlignments[0] = savedAlignments[0];
    currentAlignments[1] = savedAlignments[1];
    currentAlignments[2] = savedAlignments[2];
}

let scrollingIntervals = [null, null, null];
let scrollOffsets = [0, 0, 0];
let scrollingTexts = ["", "", ""];
let originalTexts = ["", "", ""];

function togglePixelScroll(row) {
    const button = document.querySelectorAll(".scroll-button")[row];
    const hiddenText = document.getElementById(`hiddenText${row + 1}`);

    if (scrollingIntervals[row]) {
        clearInterval(scrollingIntervals[row]);
        scrollingIntervals[row] = null;
        scrollOffsets[row] = 0; 
        button.classList.remove("fa-angles-left");
        button.classList.add("fa-pause");
        hiddenText.value = originalTexts[row];
        updateDisplay();
    } else {
        originalTexts[row] = hiddenText.value;
        
        // Dodajemy odstęp, aby tekst miał czas na wyjechanie
        scrollingTexts[row] = hiddenText.value;
        scrollingIntervals[row] = setInterval(() => {
            // Poprawiamy obliczanie scrollOffsets - teraz tekst ma przejść całą szerokość i wrócić do początku
            scrollOffsets[row] = (scrollOffsets[row] + 1) - 140;  // Pełne przewinięcie
            updateDisplay();
        }, 50);  // Prędkość przewijania (można zmienić, aby dopasować do oczekiwań)
    
        button.classList.remove("fa-pause");
        button.classList.add("fa-angles-left");
    }
    
    
}

document.querySelectorAll(".scroll-button").forEach((button, index) => {
    button.addEventListener("click", () => togglePixelScroll(index));
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input[type='text']").forEach(input => {
        input.addEventListener("input", syncHiddenInputs);
    });
    // Jeśli tryb automatyczny jest włączony, rozpocznij cykliczne odświeżanie
    if (isAutoMode) {
        updateAutoModeDisplay();
        refreshAutoMode();
    }
});

document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll("input").forEach(input => {
                input.addEventListener("keydown", event => {
                    if (event.key === "Enter") updateDisplay();
                });
            });
        });

createPixels();