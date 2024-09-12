const emojis = {
    "-": " ",
    O: "⛺",
    X: "🪵",
    I: "💎",
    PLAYER: "🧙‍♂️",
    BOMB_COLLISION: "🔥",
    GAME_OVER: "👎",
    WIN: "🏆",
    HEART: "🧡",
    EMPTY_HEART: "🖤",
  };
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    OXXXXXXXX-
    --XXXX-X-X
    X-X----X-X
    X---XX-X-X
    -XXX---X-X
    ------XX-I
    XXXX-X-X-X
    XXXX-X---X
    XXXX---XXX
    XXXXXXXXXX
    `);