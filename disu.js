const { PageSize } = require("docx");
const docx = require("docx");
const fs = require('fs');
const { title } = require("process");
const { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun, UnderlineType, Table, TableRow, TableCell, BorderStyle, WidthType, convertInchesToTwip, Footer, Header, floating, Image, ImageRun} = docx;
const mysql = require('mysql');
const moment = require("moment");
const { syncBuiltinESMExports } = require("module");

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBName,
//   port: process.env.DB_PORT,
});

let documentData = null;

const prepareDocument = async () => {

const space = new Paragraph({
        children: [
            new TextRun({
                text: ``
            })
        ]
})

const dibOrDisu = documentData.DibOrDisu ? `disu` : `dib`

const title1 = new Paragraph({
    alignment:AlignmentType.LEFT,
    children: [
        new TextRun({
            text: documentData.title,
            font: "Arial",
            size: 24,
            bold: true,
            color: "7030A0"
        }),
    ],
});

const gensit = new Paragraph({
    alignment:AlignmentType.LEFT,
    children: [
        new TextRun({
            text: `General Situation`,
            font: "Arial",
            size: 24,
            bold: true,
            color: "7030A0"
        }),
    ],
});

const developmentss = new Paragraph({
    alignment:AlignmentType.LEFT,
    children: [
        new TextRun({
            text: `Developments`,
            font: "Arial",
            size: 24,
            bold: true,
            color: "7030A0"
        }),
    ],
});

const assessments = new Paragraph({
    alignment:AlignmentType.LEFT,
    children: [
        new TextRun({
            text: `Analysis`,
            font: "Arial",
            size: 24,
            bold: true,
            color: "7030A0"
        }),
    ],
});

const date = new Paragraph({
    alignment:AlignmentType.CENTER,
    children: [
        new TextRun({
            text: `(As of ${documentData.date})`,
            font: "Arial",
            size: 24,
        }),
    ],
});

const cybersecurity = new Paragraph({
    alignment:AlignmentType.LEFT,
    indent: 0.25,
    children: [
        new TextRun({
            text: `\tI.\tCYBERSECURITY`,
            font: "Arial",
            size: 24,
            bold: true,
        }),
    ]
})
const domestic = new Paragraph({
    children: [
        new TextRun({text: "            "}),
        new TextRun({
            text: "Domestic",
            font: "arial",
            size: 24,
            underline: true
        })
    ]


})
const foreign = new Paragraph({
    children: [
        new TextRun({text: "            "}),
        new TextRun({
            text: "Foreign",
            font: "arial",
            size: 24,
            underline: true
        })
    ]
})

const nodomestic = new Paragraph({
    children: [
        new TextRun({
            text: documentData.domfor.toLowerCase() === "domestic" ? `\t${documentData.title}` : `\tThere were no significant developments in the domestic scene`,
            font:"arial",
            bold: documentData.domfor.toLowerCase() === "domestic",
            size: 24,
        }),
    ]
})

const domesticbody = new Paragraph({
    alignment:AlignmentType.JUSTIFIED,
    children: [
        new TextRun({
            text: documentData.domfor.toLowerCase() === "domestic" ? `\t${documentData.body}` : ``,
            font:"arial",
            size: 24,
        }),
    ]
})


const noforeign = new Paragraph({
    children: [
        new TextRun({
            text: documentData.domfor.toLowerCase() === "foreign" ? `\t${documentData.title}` : `\tThere were no significant developments in the domestic scene`,
            font:"arial",
            bold: documentData.domfor.toLowerCase() === "foreign",
            size: 24,
        })
    ]
})

const foreignbody = new Paragraph({
    alignment:AlignmentType.JUSTIFIED,
    children: [
        new TextRun({
            text: documentData.domfor.toLowerCase() === "foreign" ? `\t${documentData.body}` : ``,
            font:"arial",
            size: 24,
        }),
    ]
})
const tablesss = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [developmentss],
                    margins: {
                        left: convertInchesToTwip(0.08),
                        right: convertInchesToTwip(0.08),
                    },

                }),
            ],
        }),
    ],
    borders: {
        left: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        right: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        top: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
        bottom: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
    },
    width: {
        size: 100,
        type: WidthType.PERCENTAGE,
    }
});
const tablessss = new Table({
    
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: 
                    [assessments],
                    margins: {
                        left: convertInchesToTwip(0.08),
                        right: convertInchesToTwip(0.08),
                    },

                }),
            ],
        }),
    ],
    borders: {
        left: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        right: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        top: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
        bottom: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
    },
    width: {
        size: 100,
        type: WidthType.PERCENTAGE,
    }
});
const tabless = new Table({
    
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [gensit],
                    margins: {
                        left: convertInchesToTwip(0.08),
                        right: convertInchesToTwip(0.08),
                    },

                }),
            ],
        }),
    ],
    borders: {
        left: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        right: {
            style: BorderStyle.NONE,
            size: 3,
            color: "FF00FF",
        },
        top: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
        bottom: {
            style: BorderStyle.THICK,
            size: 10,
            color: "FF00FF",
        },
    },
    width: {
        size: 100,
        type: WidthType.PERCENTAGE,
    }
});

const nisfpng = new ImageRun({
    data: fs.readFileSync("./assets/nisf.png"),
    transformation: {
        width: 100,
        height: 100,
    },
    floating: {
        horizontalPosition: {
            offset: 1000000,
        },
        verticalPosition: {
            offset: 1000000,
        },
    },
});

const assessmentBody = new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    children: [
        new TextRun({
            text: documentData.domfor.toLowerCase() === "foreign" ? `\t${documentData.assessment}` : "",
            font:"arial",
            size: 24,
        }),
        new TextRun({
            text: documentData.domfor.toLowerCase() === "domestic"  ? `\t${documentData.assessment}` : "",
            font:"arial",
            size: 24,
        })
    ]
})
const sign = new Paragraph({
    alignment: AlignmentType.RIGHT,
    children: [
        new TextRun({
            text: `-   ESPAÑOLA   -`,
            font: `arial`,
            size: 24,
            bold: true
        })
    ]

})

const sigVulnerabilities = new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [
        new TextRun({
            text: `Significant Vulnerabilities`,
            bold: true,
            underline: true,
            font: `Arial`,
            size: 22
        })
    ]
})

let downloadthis;
const doc = new Document({
        creator: "Researcher",
        title: "",
        description: "",

        sections: [{
            
            headers: {
                default: new Header({
                    children: [],
                }),
            },
            footers: {
                default: new Footer({ 
                    children: [
                        new Paragraph({
                            alignment:AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: `TIG-DISU ${documentData.date}`,
                                    font: "calibri",
                                    allCaps: true,
                                    size: 22,
                                    color: "7030A0",
                                }),
                            ],
                        }),
                    ],
                })
            },

            children: [
                new Paragraph({
                    children: [nisfpng],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "PHILIPPINE NAVY",
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "NAVAL INTELLIGENCE AND SECURITY FORCE",
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "TECHNICAL INTELLIGENCE GROUP",
                            bold: true,
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Naval Station Jose Francisco",
                            font: "Arial",
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: `Fort Bonifacio, Taguig City`,
                            font: "Arial",
                            size: 24,
                        }),
                    ],
                }),
                space,
                space,
                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "DAILY INTELLIGENCE SUMMARY UPDATE",
                            font: "Arial",
                            size: 24,
                            bold: true,
                        }),
                    ],
                }),
                date,space,
                tabless,space,
                cybersecurity,space,
                domestic,space,
                nodomestic,space,
                foreign,space,
                noforeign,space,
                tablesss,space,
                cybersecurity,space,
                domestic,space,
                nodomestic,
                domesticbody,space,
                foreign,space,
                noforeign,space,
                foreignbody,space,
                tablessss,space,
                assessmentBody,space,
                sign
            ],
        }],
    });
    const dib = new Document({
        creator: "Raph",
        title: "DISU",
        description: "disu",

        sections: [{
            
            headers: {
                default: new Header({
                    children: [],
                }),
            },
            footers: {
                default: new Footer({ 
                    children: [
                        new Paragraph({
                            alignment:AlignmentType.RIGHT,
                            children: [
                                new TextRun({
                                    text: `TIG-DISU ${documentData.date}`,
                                    font: "calibri",
                                    allCaps: true,
                                    size: 22,
                                    color: "7030A0",
                                }),
                            ],
                        }),
                    ],
                })
            },

            children: [
                new Paragraph({
                    children: [nisfpng],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "PHILIPPINE NAVY",
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "NAVAL INTELLIGENCE AND SECURITY FORCE",
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "TECHNICAL INTELLIGENCE GROUP",
                            bold: true,
                            font: "Arial",
                            allCaps: true,
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Naval Station Jose Francisco",
                            font: "Arial",
                            size: 24,
                        }),
                    ],
                }),

                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: `Fort Bonifacio, Taguig City`,
                            font: "Arial",
                            size: 24,
                        }),
                    ],
                }),
                space,
                space,
                new Paragraph({
                    alignment:AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "DAILY INTELLIGENCE SUMMARY UPDATE",
                            font: "Arial",
                            size: 24,
                            bold: true,
                        }),
                    ],
                }),
                date,space,
                tabless,space,
                cybersecurity,space,
                domestic,space,
                nodomestic,space,
                foreign,space,
                noforeign,space,
                tablesss,space,
                cybersecurity,space,
                domestic,space,
                nodomestic,
                domesticbody,space,
                foreign,space,
                noforeign,space,
                foreignbody,space,
                sign
            ],
        }],
    });
    if(documentData.DibOrDisu.toLowerCase() === `disu`){
        downloadthis = doc;
    }
    else{
        downloadthis = dib;
    }
    const filename = `TIG_DISU`;
    
    docx.Packer.toBuffer(downloadthis).then((buffer) => {
        fs.writeFileSync(`./docs/${filename}.docx`, buffer);
    });      
    return filename;  
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// User the connection
const getDoc = (docId, res) => {
connection.query('SELECT * FROM docs WHERE id = ?', [docId], async (err, row) => {
     if (!err) {
        if(row.length) {
            documentData = row[0];
            console.log('documentData', documentData)
            let document = await prepareDocument();
            await sleep(200);
            res.download(`./docs/${document}.docx`); 
            console.log('document', document)
            console.log("testing");
            return document;
        }
     } else {
        console.log(err);
     }
        console.log('The data from document table: \n', row);
    });
}
// 251200H April 2022

module.exports = getDoc;
