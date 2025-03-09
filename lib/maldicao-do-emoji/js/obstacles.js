// ⚠️ Obstacle Patterns
const levelEmojiShapes = [
    [
        {
          type: "blood-sigil",
          pattern: [
            ["", "", "🩸", "", ""],
            ["", "🩸", "🩸", "🩸", ""],
            ["🩸", "🩸", "🩸", "🩸", "🩸"],
            ["", "🩸", "🩸", "🩸", ""],
            ["", "", "🩸", "", ""]
          ]
        },
        {
          type: "grim-cube",
          pattern: [
            ["🦂", "", "🦂"],
            ["🦂", "", "🦂"],
            ["🦂", "🦂", "🦂"],
            ["🦂", "", "🦂"],
            ["🦂", "", "🦂"]
          ]
        },
        {
          type: "altar",
          pattern: [
            ["", "", "🔮", "", ""],
            ["", "🔮", "🔮", "🔮", ""],
            ["🔮", "🔮", "🔮", "🔮", "🔮"],
            ["", "🔮", "🔮", "🔮", ""],
            ["", "", "🔮", "", ""]
          ]
        },
        {
          type: "scalpel-bar",
          pattern: [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["🔪", "🔪", "🔪", "🔪", "🔪"],
            ["", "", "", "", ""],
            ["", "", "", "", ""]
          ]
        },
        {
          type: "crescent-doom",
          pattern: [
            ["", "🌘", "", ""],
            ["", "", "🌘", ""],
            ["", "", "", "🌘"],
            ["", "", "", "🌘"],
            ["", "", "🌘", ""],
            ["", "🌘", "", ""]
          ]
        },
        {
          type: "spine-ladder",
          pattern: [
            ["🦴", "🦴", "🦴", ""],
            ["", "🦴", "🦴", "🦴"],
            ["", "", "🦴", "🦴"],
            ["", "", "🦴", "🦴"],
            ["", "", "🦴", "🦴"],
            ["", "🦴", "🦴", "🦴"],
            ["🦴", "🦴", "🦴", ""]
          ]
        }
      ],
      [
        {
          type: "grave-pyramid",
          pattern: [
            ["", "", "☠️", "", ""],
            ["", "☠️", "☠️", "☠️", ""],
            ["☠️", "☠️", "☠️", "☠️", "☠️"],
            ["", "☠️", "☠️", "☠️", ""],
            ["", "", "☠️", "", ""]
          ]
        },
        {
          type: "the-gazing-orb",
          pattern: [
            ["", "🧿", "", "🧿", ""],
            ["", "", "🧿", "", ""],
            ["🧿", "🧿", "🧿", "🧿", "🧿"],
            ["", "", "🧿", "", ""],
            ["", "🧿", "", "🧿", ""]
          ]
        },
        {
          type: "decaying-grasp",
          pattern: [
            ["🫱", "", "🫱", "", "🫱"],
            ["", "🫱", "🫱", "🫱", ""],
            ["", "", "🫱", "", ""],
            ["", "🫱", "🫱", "🫱", ""],
            ["🫱", "", "🫱", "", "🫱"]
          ]
        },
        {
          type: "tormented-visage",
          pattern: [
            ["", "", "🫨", "", ""],
            ["", "🫨", "🫨", "🫨", ""],
            ["🫨", "🫨", "🫨", "🫨", "🫨"],
            ["", "🫨", "🫨", "🫨", ""],
            ["", "", "🫨", "", ""]
          ]
        },
        {
          type: "endless-void",
          pattern: [
            ["", "🕳️", "", ""],
            ["", "", "🕳️", ""],
            ["", "", "", "🕳️"],
            ["", "", "", "🕳️"],
            ["", "", "🕳️", ""],
            ["", "🕳️", "", ""]
          ]
        },
        {
          type: "cobweb-lattice",
          pattern: [
            ["", "🕸️", "", "🕸️", ""],
            ["🕸️", "", "🕷️", "", "🕸️"],
            ["", "🕷️", "", "🕷️", ""],
            ["🕸️", "", "🕷️", "", "🕸️"],
            ["", "🕸️", "", "🕸️", ""]
          ]
        }
      ],
      [
        {
          type: "writhing-limb-spiral",
          pattern: [
            ["", "", "🪱", "", ""],
            ["", "🪱", "", "🪱", ""],
            ["🪱", "", "🪱", "", "🪱"],
            ["", "🪱", "", "🪱", ""],
            ["", "", "🪱", "", ""]
          ]
        },
        {
          type: "spectral-gaze",
          pattern: [
            ["", "🧿", "", "🧿", ""],
            ["", "", "🧿", "", ""],
            ["🧿", "🧿", "🧿", "🧿", "🧿"],
            ["", "", "🧿", "", ""],
            ["", "🧿", "", "🧿", ""]
          ]
        },
        {
          type: "abstract-horror",
          pattern: [
            ["", "", "🫠", "", ""],
            ["", "🫠", "🫠", "🫠", ""],
            ["🫠", "🫠", "🫠", "🫠", "🫠"],
            ["", "🫠", "🫠", "🫠", ""],
            ["", "", "🫠", "", ""]
          ]
        },
        {
          type: "murmuring-maws",
          pattern: [
            ["", "🫦", "", "🫦", ""],
            ["", "", "🫦", "", ""],
            ["🫦", "🫦", "🫦", "🫦", "🫦"],
            ["", "", "🫦", "", ""],
            ["", "🫦", "", "🫦", ""]
          ]
        },
        {
          type: "abyss",
          pattern: [
            ["", "⬛", "", "⬛", ""],
            ["", "", "⬛", "", ""],
            ["⬛", "⬛", "⬛", "⬛", "⬛"],
            ["", "", "⬛", "", ""],
            ["", "⬛", "", "⬛", ""]
          ]
        },
        {
          type: "cackling-remains",
          pattern: [
            ["", "💀", "", "💀", ""],
            ["", "", "💀", "", ""],
            ["💀", "💀", "💀", "💀", "💀"],
            ["", "", "💀", "", ""],
            ["", "💀", "", "💀", ""]
          ]
        },
      ],
      [
        {
          type: "forbidden-star",
          pattern: [
            ["", "", "🩸", "", ""],
            ["", "🩸", "🩸", "🩸", ""],
            ["🩸", "🩸", "🔥", "🩸", "🩸"],
            ["", "🩸", "🩸", "🩸", ""],
            ["", "", "🩸", "", ""]
          ]
        },
        {
          type: "fiendish-visor",
          pattern: [
            ["", "👺", "", "👺", ""],
            ["", "", "👺", "", ""],
            ["👺", "👺", "👺", "👺", "👺"],
            ["", "", "👺", "", ""],
            ["", "👺", "", "👺", ""]
          ]
        },
        {
          type: "hexed-tomb",
          pattern: [
            ["", "", "🪦", "", ""],
            ["", "🪦", "🕯", "🪦", ""],
            ["🪦", "🕯", "🕯", "🕯", "🪦"],
            ["", "🪦", "🕯", "🪦", ""],
            ["", "", "🪦", "", ""]
          ]
        },
        {
          type: "phantom-binds",
          pattern: [
            ["", "⛓️", "", "⛓️", ""],
            ["⛓️", "", "👻", "", "⛓️"],
            ["", "⛓️", "", "⛓️", ""],
            ["⛓️", "", "👻", "", "⛓️"],
            ["", "⛓️", "", "⛓️", ""]
          ]
        },
        {
          type: "howling-abyss",
          pattern: [
            ["", "", "🫨", "", ""],
            ["", "🫨", "⬛", "🫨", ""],
            ["🫨", "⬛", "⬛", "⬛", "🫨"],
            ["", "🫨", "⬛", "🫨", ""],
            ["", "", "🫨", "", ""]
          ]
        },
        {
          type: "abyssal-gate",
          pattern: [
            ["", "", "🔥", "", ""],
            ["", "🔥", "👿", "🔥", ""],
            ["🔥", "👿", "👿", "👿", "🔥"],
            ["", "🔥", "👿", "🔥", ""],
            ["", "", "🔥", "", ""]
          ]
        },
      ],
      [
        {
          type: "cross-of-bones",
          pattern: [
            ["", "", "💀", "", ""],
            ["", "💀", "💀", "💀", ""],
            ["💀", "💀", "💀", "💀", "💀"],
            ["", "💀", "💀", "💀", ""],
            ["", "", "💀", "", ""]
          ]
        },
        {
          type: "cycle-of-burial",
          pattern: [
            ["", "🪦", "", "🪦", ""],
            ["", "", "🪦", "", ""],
            ["🪦", "🪦", "🪦", "🪦", "🪦"],
            ["", "", "🪦", "", ""],
            ["", "🪦", "", "🪦", ""]
          ]
        },
        {
          type: "eclipsed-soul",
          pattern: [
            ["", "", "⬛", "", ""],
            ["", "⬛", "👥", "⬛", ""],
            ["⬛", "👥", "⬛", "👥", "⬛"],
            ["", "⬛", "👥", "⬛", ""],
            ["", "", "⬛", "", ""]
          ]
        },
        {
          type: "oblivion-walker",
          pattern: [
            ["", "", "🫥", "", ""],
            ["", "🫥", "", "🫥", ""],
            ["🫥", "", "🫥", "", "🫥"],
            ["", "🫥", "", "🫥", ""],
            ["", "", "🫥", "", ""]
          ]
        },
        {
          type: "muttering-mask",
          pattern: [
            ["", "🤐", "", "🤐", ""],
            ["", "", "🤐", "", ""],
            ["🤐", "🤐", "🤐", "🤐", "🤐"],
            ["", "", "🤐", "", ""],
            ["", "🤐", "", "🤐", ""]
          ]
        },
        {
          type: "arcane-curse",
          pattern: [
            ["", "🪄", "", "🪄", ""],
            ["", "", "🪄", "", ""],
            ["🪄", "🪄", "🪄", "🪄", "🪄"],
            ["", "", "🪄", "", ""],
            ["", "🪄", "", "🪄", ""]
          ]
        },
        {
          type: "blood-rite",
          pattern: [
            ["", "", "🩸", "", ""],
            ["", "🩸", "🗡", "🩸", ""],
            ["🩸", "🗡", "🔪", "🗡", "🩸"],
            ["", "🩸", "🗡", "🩸", ""],
            ["", "", "🩸", "", ""]
          ]
        }
    ],
    [ // Level 1 Shapes - Unearthly Beginnings
        {
            type: "rotting-pyramid",
            pattern: [["", "", "🧠", "", ""], ["", "🧠", "🩻", "🧠", ""], ["🩻", "🩻", "🧠", "🩻", "🩻"], ["", "🩻", "🧠", "🩻", ""], ["", "", "🧠", "", ""]],
            description: "A pyramid of oozing brains and exposed ribs, pulsing faintly."
        },
        {
            type: "flesh-cube",
            pattern: [["🩸", "", "🩸"], ["🩸", "", "🩸"], ["🩸", "🦷", "🩸"], ["🩸", "", "🩸"], ["🩸", "", "🩸"]],
            description: "A cube of dripping blood with a single jagged tooth at its core."
        },
        {
            type: "eye-diamond",
            pattern: [["", "", "👁️‍🗨️", "", ""], ["", "👁️‍🗨️", "👁️", "👁️‍🗨️", ""], ["👁️", "👁️‍🗨️", "👁️", "👁️‍🗨️", "👁️"], ["", "👁️‍🗨️", "👁️", "👁️‍🗨️", ""], ["", "", "👁️‍🗨️", "", ""]],
            description: "A diamond of unblinking, bloodshot eyes that seem to follow you."
        },
        {
            type: "bone-slab",
            pattern: [["", "", "", "", ""], ["", "", "", "", ""], ["🦴", "🦴", "🦴", "🦴", "🦴"], ["", "", "", "", ""], ["", "", "", "", ""]],
            description: "A slab of cracked, marrow-leaking bones fused together."
        },
        {
            type: "withered-lune",
            pattern: [["", "🌚", "", ""], ["", "", "🌚", ""], ["", "", "", "🌚"], ["", "", "", "🌚"], ["", "", "🌚", ""], ["", "🌚", "", ""]],
            description: "A crescent of blackened, pockmarked moons dripping with shadow."
        },
        {
            type: "twisted-skeleton",
            pattern: [["🦴", "🦴", "🦴", ""], ["", "🦴", "🩻", "🦴"], ["", "", "🩻", "🦴"], ["", "", "🦴", "🩻"], ["", "", "🦴", "🩻"], ["", "🦴", "🩻", "🦴"], ["🦴", "🩻", "🦴", ""]],
            description: "A contorted skeletal frame with ribs and bones unnaturally bent."
        }
    ],
    [ // Level 2 Shapes - Creeping Nightmares
        {
            type: "skull-shard",
            pattern: [["", "", "💀", "", ""], ["", "💀", "🕳️", "💀", ""], ["💀", "🕳️", "💀", "🕳️", "💀"], ["", "💀", "🕳️", "💀", ""], ["", "", "💀", "", ""]],
            description: "A fractured skull triangle with hollow voids staring back."
        },
        {
            type: "weeping-orb",
            pattern: [["", "🩸", "", "🩸", ""], ["", "", "👁️", "", ""], ["🩸", "👁️", "🩸", "👁️", "🩸"], ["", "", "👁️", "", ""], ["", "🩸", "", "🩸", ""]],
            description: "An orb of crying eyes leaking blood from unseen wounds."
        },
        {
            type: "clawing-remains",
            pattern: [["🖐️", "", "🦴", "", "🖐️"], ["", "🖐️", "🦴", "🖐️", ""], ["", "", "🖐️", "", ""], ["", "🖐️", "🦴", "🖐️", ""], ["🖐️", "", "🦴", "", "🖐️"]],
            description: "Decayed hands clawing upward, clutching broken bones."
        },
        {
            type: "howling-maw",
            pattern: [["", "", "👄", "", ""], ["", "👄", "🕳️", "👄", ""], ["👄", "🕳️", "👄", "🕳️", "👄"], ["", "👄", "🕳️", "👄", ""], ["", "", "👄", "", ""]],
            description: "A triangle of gaping mouths screaming into a void."
        },
        {
            type: "ebon-spiral",
            pattern: [["", "🕳️", "", ""], ["", "", "🕳️", ""], ["", "", "", "🕳️"], ["", "", "", "🕳️"], ["", "", "🕳️", ""], ["", "🕳️", "", ""]],
            description: "A spiraling trail of pitch-black holes swallowing light."
        },
        {
            type: "cocoon-trap",
            pattern: [["", "🕸️", "", "🕸️", ""], ["🕸️", "", "🕷️", "", "🕸️"], ["", "🕷️", "", "🕷️", ""], ["🕸️", "", "🕷️", "", "🕸️"], ["", "🕸️", "", "🕸️", ""]],
            description: "A web woven with twitching spiders guarding their prey."
        }
    ],
    [ // Level 3 Shapes - Cosmic Terrors
        {
            type: "writhing-mass",
            pattern: [["", "", "🐙", "", ""], ["", "🐙", "", "🐙", ""], ["🐙", "", "🩸", "", "🐙"], ["", "🐙", "", "🐙", ""], ["", "", "🐙", "", ""]],
            description: "A spiral of tentacles dripping with crimson ichor."
        },
        {
            type: "gazing-abyss",
            pattern: [["", "👁️‍🗨️", "", "👁️‍🗨️", ""], ["", "", "👁️", "", ""], ["👁️‍🗨️", "👁️", "👁️‍🗨️", "👁️", "👁️‍🗨️"], ["", "", "👁️", "", ""], ["", "👁️‍🗨️", "", "👁️‍🗨️", ""]],
            description: "A swarm of eldritch eyes peering from a dark expanse."
        },
        {
            type: "grinning-horror",
            pattern: [["", "", "😬", "", ""], ["", "😬", "🦷", "😬", ""], ["😬", "🦷", "😬", "🦷", "😬"], ["", "😬", "🦷", "😬", ""], ["", "", "😬", "", ""]],
            description: "A grotesque face with jagged teeth in a rictus grin."
        },
        {
            type: "chattering-lips",
            pattern: [["", "👄", "", "👄", ""], ["", "", "👄", "", ""], ["👄", "👄", "🩸", "👄", "👄"], ["", "", "👄", "", ""], ["", "👄", "", "👄", ""]],
            description: "Bloody lips whispering incomprehensible curses."
        },
        {
            type: "shattered-realm",
            pattern: [["", "🕳️", "", "🕳️", ""], ["", "", "🕳️", "", ""], ["🕳️", "🕳️", "🩻", "🕳️", "🕳️"], ["", "", "🕳️", "", ""], ["", "🕳️", "", "🕳️", ""]],
            description: "A void with skeletal fragments floating in emptiness."
        },
        {
            type: "horned-relics",
            pattern: [["", "👹", "", "👹", ""], ["", "", "👹", "", ""], ["👹", "👹", "🩸", "👹", "👹"], ["", "", "👹", "", ""], ["", "👹", "", "👹", ""]],
            description: "Demonic skulls with blood pooling at their base."
        }
    ],
    [ // Level 4 Shapes - Infernal Depths
        {
            type: "bleeding-star",
            pattern: [["", "", "🩸", "", ""], ["", "🩸", "🔥", "🩸", ""], ["🔥", "🩸", "🔥", "🩸", "🔥"], ["", "🩸", "🔥", "🩸", ""], ["", "", "🩸", "", ""]],
            description: "A pentagram of fire and blood seeping from its points."
        },
        {
            type: "flayed-visage",
            pattern: [["", "🩻", "", "🩻", ""], ["", "", "🩻", "", ""], ["🩻", "🩻", "🩸", "🩻", "🩻"], ["", "", "🩻", "", ""], ["", "🩻", "", "🩻", ""]],
            description: "A mask of exposed bone dripping with gore."
        },
        {
            type: "rotting-tomb",
            pattern: [["", "", "🪦", "", ""], ["", "🪦", "🕸️", "🪦", ""], ["🪦", "🕸️", "🩸", "🕸️", "🪦"], ["", "🪦", "🕸️", "🪦", ""], ["", "", "🪦", "", ""]],
            description: "A grave overtaken by webs and oozing blood."
        },
        {
            type: "phantom-links",
            pattern: [["", "🕳️", "", "🕳️", ""], ["🕳️", "", "👻", "", "🕳️"], ["", "🕳️", "", "🕳️", ""], ["🕳️", "", "👻", "", "🕳️"], ["", "🕳️", "", "🕳️", ""]],
            description: "A chain of ghostly wisps bound by dark voids."
        },
        {
            type: "wailing-rift",
            pattern: [["", "", "😫", "", ""], ["", "😫", "🕳️", "😫", ""], ["😫", "🕳️", "🕳️", "🕳️", "😫"], ["", "😫", "🕳️", "😫", ""], ["", "", "😫", "", ""]],
            description: "A void filled with distorted, anguished faces."
        },
        {
            type: "infernal-gate",
            pattern: [["", "", "🔥", "", ""], ["", "🔥", "🩸", "🔥", ""], ["🔥", "🩸", "🩻", "🩸", "🔥"], ["", "🔥", "🩸", "🔥", ""], ["", "", "🔥", "", ""]],
            description: "A portal of flame and bone leaking blood."
        }
    ],
    [ // Level 5 Shapes - Ultimate Dread
        {
            type: "skull-altar",
            pattern: [["", "", "💀", "", ""], ["", "💀", "🩸", "💀", ""], ["💀", "🩸", "💀", "🩸", "💀"], ["", "💀", "🩸", "💀", ""], ["", "", "💀", "", ""]],
            description: "A cross of skulls atop a blood-soaked altar."
        },
        {
            type: "sepulcher-ring",
            pattern: [["", "🪦", "", "🪦", ""], ["", "", "🪦", "", ""], ["🪦", "🪦", "🕸️", "🪦", "🪦"], ["", "", "🪦", "", ""], ["", "🪦", "", "🪦", ""]],
            description: "A circle of tombstones bound by cobwebs."
        },
        {
            type: "lurking-presence",
            pattern: [["", "", "🕳️", "", ""], ["", "🕳️", "👤", "🕳️", ""], ["🕳️", "👤", "🩸", "👤", "🕳️"], ["", "🕳️", "👤", "🕳️", ""], ["", "", "🕳️", "", ""]],
            description: "A shadowy figure bleeding into the darkness."
        },
        {
            type: "hollow-ones",
            pattern: [["", "", "🫥", "", ""], ["", "🫥", "", "🫥", ""], ["🫥", "", "🕳️", "", "🫥"], ["", "🫥", "", "🫥", ""], ["", "", "🫥", "", ""]],
            description: "Faceless entities orbiting a central void."
        },
        {
            type: "silent-watchers",
            pattern: [["", "😶", "", "😶", ""], ["", "", "😶", "", ""], ["😶", "😶", "🩸", "😶", "😶"], ["", "", "😶", "", ""], ["", "😶", "", "😶", ""]],
            description: "Mute faces with blood pooling beneath them."
        },
        {
            type: "forbidden-orb",
            pattern: [["", "🔮", "", "🔮", ""], ["", "", "🔮", "", ""], ["🔮", "🔮", "🩻", "🔮", "🔮"], ["", "", "🔮", "", ""], ["", "🔮", "", "🔮", ""]],
            description: "A hex of orbs imprisoning skeletal remains."
        },
        {
            type: "blood-rite",
            pattern: [["", "", "🩸", "", ""], ["", "🩸", "🪦", "🩸", ""], ["🩸", "🪦", "🔥", "🪦", "🩸"], ["", "🩸", "🪦", "🩸", ""], ["", "", "🩸", "", ""]],
            description: "A sacrificial circle of graves, fire, and blood."
        }
    ],
    [
        {
            type: "bleeding-pyramid",
            pattern: [
                ["", "", "🩸", "", ""],
                ["", "🩸", "💉", "🩸", ""],
                ["🩸", "💉", "🪚", "💉", "🩸"],
                ["", "🩸", "💉", "🩸", ""],
                ["", "", "🩸", "", ""]
            ]
        },
        {
            type: "flesh-cube",
            pattern: [
                ["🫀", "🧠", "🫀"],
                ["🩸", "👁️", "🩸"],
                ["🫀", "🫁", "🫀"],
                ["🩸", "👁️", "🩸"],
                ["🫀", "🧠", "🫀"]
            ]
        },
        {
            type: "ooze-rhombus",
            pattern: [
                ["", "", "🦠", "", ""],
                ["", "🐌", "🧫", "🐌", ""],
                ["🦠", "🧫", "💧", "🧫", "🦠"],
                ["", "🐌", "🧫", "🐌", ""],
                ["", "", "🦠", "", ""]
            ]
        },
        {
            type: "spinal-column",
            pattern: [
                ["", "", "", "", ""],
                ["", "", "", "", ""],
                ["🦴", "🦷", "💀", "🦷", "🦴"],
                ["", "", "", "", ""],
                ["", "", "", "", ""]
            ]
        },
        {
            type: "wretched-crescent",
            pattern: [
                ["", "🌘", "🪶", ""],
                ["", "🪶", "🌑", ""],
                ["🌑", "🕸️", "🪶", "🌘"],
                ["", "🌑", "🕸️", ""],
                ["", "🪶", "🌘", ""]
            ]
        },
        {
            type: "carrion-pile",
            pattern: [
                ["🪰", "🪳", "🪲", ""],
                ["", "💩", "🦠", "🧻"],
                ["", "", "🪣", "🩸"],
                ["", "", "🗑️", "🦠"],
                ["", "🪰", "💩", "🪳"],
                ["🪲", "🧻", "🩸", ""]
            ]
        }
    ],
    [
        {
            type: "soul-bramble",
            pattern: [
                ["", "", "👻", "", ""],
                ["", "🔥", "⚰️", "🔥", ""],
                ["💀", "🩸", "💫", "🩸", "💀"],
                ["", "🔥", "⚰️", "🔥", ""],
                ["", "", "👻", "", ""]
            ]
        },
        {
            type: "weeping-orbs",
            pattern: [
                ["", "👁️🗨️", "", "👁️🗨️", ""],
                ["", "🩸", "😭", "🩸", ""],
                ["🧿", "💧", "💧", "💧", "🧿"],
                ["", "🩸", "😭", "🩸", ""],
                ["", "👁️🗨️", "", "👁️🗨️", ""]
            ]
        },
        {
            type: "grave-diggers-claw",
            pattern: [
                ["🦴", "🪦", "🦴", "🪦", "🦴"],
                ["", "⚰️", "🪚", "⚰️", ""],
                ["", "", "🩸", "", ""],
                ["", "⚰️", "🪚", "⚰️", ""],
                ["🦴", "🪦", "🦴", "🪦", "🦴"]
            ]
        },
        {
            type: "maw-of-madness",
            pattern: [
                ["", "", "🫦", "", ""],
                ["", "👅", "🦷", "👅", ""],
                ["👂", "👁️", "🕳️", "👁️", "👂"],
                ["", "👅", "🦷", "👅", ""],
                ["", "", "🫦", "", ""]
            ]
        },
        {
            type: "eldritch-mandala",
            pattern: [
                ["", "", "🕷️", "", ""],
                ["", "🕸️", "🔮", "🕸️", ""],
                ["🐙", "🌌", "👁️", "🌌", "🐙"],
                ["", "🕸️", "🔮", "🕸️", ""],
                ["", "", "🕷️", "", ""]
            ]
        },
        {
            type: "spectral-gaze",
            pattern: [
                ["👁️‍🗨️", "👻", "👁️‍🗨️", "👻", "👁️‍🗨️"],
                ["", "💀", "🕯️", "💀", ""],
                ["", "", "👁️", "", ""],
                ["", "💀", "🕯️", "💀", ""],
                ["👁️‍🗨️", "👻", "👁️‍🗨️", "👻", "👁️‍🗨️"]
            ]
        }
    ],
    [
        {
            type: "oblivion-glyph",
            pattern: [
                ["", "", "🕳️", "", ""],
                ["", "🌑", "🌀", "🌑", ""],
                ["⚫", "🌀", "💫", "🌀", "⚫"],
                ["", "🌑", "🌀", "🌑", ""],
                ["", "", "🕳️", "", ""]
            ]
        },
        {
            type: "ritual-brand",
            pattern: [
                ["", "🩸", "", "🩸", ""],
                ["🩸", "🔥", "✡️", "🔥", "🩸"],
                ["", "✡️", "⛧", "✡️", ""],
                ["🩸", "🔥", "✡️", "🔥", "🩸"],
                ["", "🩸", "", "🩸", ""]
            ]
        }
    ],
    [
        {
            type: "cosmic-aberration",
            pattern: [
                ["", "🌌", "", "🌌", ""],
                ["🌠", "🔭", "🛸", "🔭", "🌠"],
                ["", "🪐", "💫", "🪐", ""],
                ["🌌", "👽", "👾", "👽", "🌌"],
                ["", "🌠", "", "🌠", ""]
            ]
        },
        {
            type: "thanatos-chamber",
            pattern: [
                ["", "⚰️", "🕯️", "⚰️", ""],
                ["⚰️", "🩸", "💀", "🩸", "⚰️"],
                ["🕯️", "💀", "🕳️", "💀", "🕯️"],
                ["⚰️", "🩸", "💀", "🩸", "⚰️"],
                ["", "⚰️", "🕯️", "⚰️", ""]
            ]
        },
        {
            type: "flesh-hive",
            pattern: [
                ["", "", "🐛", "", ""],
                ["", "🪱", "🪰", "🪱", ""],
                ["🪲", "🧬", "🫀", "🧬", "🪲"],
                ["", "🪱", "🪰", "🪱", ""],
                ["", "", "🐛", "", ""]
            ]
        }
    ]
]


// Create obstacles: ground spikes and ceiling spikes
function createObstacle() {
    const isEmojiBlock = Math.random() > 0.5; // 50% chance to generate emoji obstacles

    let levelShapes = levelEmojiShapes[playerLevel] || levelEmojiShapes[1];
    let shape = levelShapes[Math.floor(Math.random() * levelShapes.length)];

    // Calculate possible spawn points to prevent overlap
    const numSections = 5; // Divide screen height into 5 sections
    const sectionHeight = (groundLevel - ceilingLevel) / numSections;
    let availableSections = Array.from({ length: numSections }, (_, i) => i);

    const sectionIndex = availableSections.splice(
        Math.floor(Math.random() * availableSections.length),
        1
    )[0];

    let newObstacle;

    if (isEmojiBlock) {
        const blockSize = 30;
        const numRows = shape.pattern.length;
        const numCols = shape.pattern[0].length;

        // **Deep copy the pattern** to prevent modifying the original
        const copiedPattern = shape.pattern.map(row => [...row]);

        newObstacle = {
            type: "emoji-block",
            x: canvas.width,
            width: numCols * blockSize,
            height: numRows * blockSize,
            pattern: copiedPattern,  // Use copied pattern instead of reference
            blockSize: blockSize,
            rows: numRows,
            isGroundObstacle: Math.random() > 0.5,
            passed: false
        };

        newObstacle.y = ceilingLevel + sectionIndex * sectionHeight + (sectionHeight - newObstacle.height) / 2;
    } else {
        // Traditional spike obstacle
        const width = 40 + Math.random() * 40;
        const height = 80 + Math.random() * 120;

        newObstacle = {
            type: "spike",
            x: canvas.width,
            width,
            height,
            isGroundObstacle: Math.random() > 0.5,
            passed: false
        };

        newObstacle.y = ceilingLevel + sectionIndex * sectionHeight + (sectionHeight - height) / 2;
    }

    // Prevent obstacles from spawning too close together
    if (obstacles.length > 0) {
        const lastObstacle = obstacles[obstacles.length - 1];
        if (newObstacle.x - lastObstacle.x < 150) {
            return; // Avoid spawning too close
        }
    }

    obstacles.push(newObstacle);
}

// Draw obstacles
function drawObstacles() {
    for (const obstacle of obstacles) {
        if (obstacle.type === "emoji-block") {
            // Draw emoji obstacles
            for (let row = 0; row < obstacle.rows; row++) {
                for (let col = 0; col < obstacle.pattern[row].length; col++) {
                    const emoji = obstacle.pattern[row][col];
                    if (emoji === "") continue; // Skip empty spaces in pattern

                    const x = obstacle.x + col * obstacle.blockSize;
                    const y = obstacle.y + row * obstacle.blockSize;

                    ctx.font = `${obstacle.blockSize * 0.7}px Arial`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "yellow";  // Brighter color
                    ctx.strokeStyle = "black"; // Outline for better visibility
                    ctx.lineWidth = 3;
                    ctx.strokeText(emoji, x + obstacle.blockSize / 2, y + obstacle.blockSize / 2);
                    ctx.fillText(emoji, x + obstacle.blockSize / 2, y + obstacle.blockSize / 2);

                }
            }
        }
    }
}