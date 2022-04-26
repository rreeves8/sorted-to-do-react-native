const iosColors = {
    Red: {
        dark: {
            R: 255,
            G: 69,
            B: 58,
        },
        light: {
            R: 255,
            G: 59,
            B: 48,
        }
    },
    Orange: {
        dark: {
            R: 255,
            G: 159,
            B: 10,
        },
        light: {
            R: 255,
            G: 149,
            B: 0,
        }
    },
    Yellow: {
        dark: {
            R: 255,
            G: 214,
            B: 10,
        },
        light: {
            R: 255,
            G: 204,
            B: 0,
        }
    },
    Green: {
        dark: {
            R: 48,
            G: 209,
            B: 88
        },
        light: {
            R: 52,
            G: 199,
            B: 89,
        }
    },
    Mint: {
        dark: {
            R: 102,
            G: 212,
            B: 207,
        },
        light: {
            R: 0,
            G: 199,
            B: 190,
        }
    },
    Teal: {
        dark: {
            R: 64,
            G: 200,
            B: 224,
        },
        light: {
            R: 48,
            G: 176,
            B: 199
        }
    },
    Cyan: {
        dark: {
            R: 100,
            G: 210,
            B: 255,
        },
        light: {
            R: 50,
            G: 173,
            B: 230
        }
    },
    Blue: {
        dark: {
            R: 10,
            G: 132,
            B: 255
        },
        light: {
            R: 0,
            G: 122,
            B: 255,
        }
    },
    Indigo: {
        dark: {
            R: 94,
            G: 92,
            B: 230,
        },
        light: {
            R: 88,
            G: 86,
            B: 214
        }
    },
    Purple: {
        dark: {
            R: 191,
            G: 90,
            B: 242

        },
        light: {
            R: 175,
            G: 82,
            B: 222
        }
    },
    Pink: {
        dark: {
            R: 255,
            G: 55,
            B: 95
        },
        light: {
            R: 255,
            G: 45,
            B: 85
        }
    },
    Brown: {
        dark: {
            R: 172,
            G: 142,
            B: 104,
        },
        light: {
            R: 162,
            G: 132,
            B: 94
        }
    },
    System: {
        gray: {
            light: {
                R: 142,
                G: 142,
                B: 147,
            }, dark: {
                R: 142,
                G: 142,
                B: 147,
            }
        },
        gray2: {
            light: {
                R: 174,
                G: 174,
                B: 178,
            }, dark: {
                R: 99,
                G: 99,
                B: 102,
            }
        },

        gray3: {
            light: {
                R: 199,
                G: 199,
                B: 204,
            },
            dark: {
                R: 72,
                G: 72,
                B: 74,
            }
        },
        gray4: {
            light: {
                R: 209,
                G: 209,
                B: 214,
            },
            dark: {
                R: 58,
                G: 58,
                B: 60,
            }
        },
        gray5: {
            light: {


                R: 229,
                G: 229,
                B: 234,
            },
            dark: {
                R: 44,
                G: 44,
                B: 46,
            }
        },
        gray6: {
            light: {

                R: 242,
                G: 242,
                B: 247,
            },
            dark: {
                R: 28,
                G: 28,
                B: 30,
            }
        }
    }
}

function getIosColors() {

    const objToStr = (obj) => {
        return 'rgb(' + obj.R + ',' + obj.G + ',' + obj.B + ')'
    }

    for (let [key, x] of Object.entries(iosColors)) {
        let value = iosColors[key]
        if (iosColors[key].light !== undefined) {
            iosColors[key].light = objToStr(iosColors[key].light)
            iosColors[key].dark = objToStr(iosColors[key].dark)
        }
        else {
            for (let [key2, y] of Object.entries(value)) {
                value[key2].light = objToStr(value[key2].light)
                value[key2].dark = objToStr(value[key2].dark)
            }
        }
        console.log(iosColors[key])
    }
}
getIosColors()
console.log(iosColors)
let json = JSON.stringify(iosColors)

var fs = require('fs');
fs.writeFile('myjsonfile.json', json, 'utf8', ()=> {
    console.log('done')
});
