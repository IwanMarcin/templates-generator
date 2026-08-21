const jurisdictionToVariants = {
    "NOT_APPLICABLE": ["rtp-variant88", "rtp-variant91", "rtp-variant93", "rtp-variant94", "rtp-variant95", "rtp-variant96", "rtp-variant94+_circus"],
    "SOCIAL": ["rtp88_SOCIAL", "rtp91_SOCIAL", "rtp93_SOCIAL", "rtp94_SOCIAL", "rtp95_SOCIAL", "rtp96_SOCIAL", "rtp96_High5Casino_SOCIAL", "rtp94+_SOCIAL_Pulsz"],
    "MT": ["rtp88_MT", "rtp91_MT", "rtp93_MT", "rtp94_MT", "rtp95_MT", "rtp96_MT", "rtp94+_MT_circus"],
    "CZ": ["rtp88_CZ", "rtp91_CZ", "rtp93_CZ", "rtp94_CZ", "rtp95_CZ", "rtp96_CZ"],
    "RO": ["rtp88_RO", "rtp91_RO", "rtp93_RO", "rtp94_RO", "rtp95_RO", "rtp96_RO"],
    "CH": ["rtp88_CH", "rtp91_CH", "rtp93_CH", "rtp94_CH", "rtp95_CH", "rtp96_CH"],
    "LV": ["rtp88_LV", "rtp91_LV", "rtp93_LV", "rtp94_LV", "rtp95_LV", "rtp96_LV"],
    "BR": ["rtp88_BR", "rtp91_BR", "rtp93_BR", "rtp94_BR", "rtp95_BR", "rtp96_BR"],
    "DE": ["rtp88_DE", "rtp91_DE"],
    "IT": ["rtp91_IT", "rtp93_IT", "rtp94_IT", "rtp95_IT", "rtp96_IT"],
    "ES": ["rtp88_ES", "rtp91_ES", "rtp93_ES", "rtp94_ES", "rtp95_ES", "rtp96_ES", "rtp94+_ES_Casino_Barcelona"],
    "NL": ["rtp88_NL", "rtp91_NL", "rtp93_NL", "rtp94_NL", "rtp95_NL", "rtp96_NL", "rtp94+_NL_circus"],
    "PT": ["rtp88_PT", "rtp91_PT", "rtp93_PT", "rtp94_PT", "rtp95_PT", "rtp96_PT"],
    "HR": ["rtp88_HR", "rtp91_HR", "rtp93_HR", "rtp94_HR", "rtp95_HR", "rtp96_HR"],
    "BG": ["rtp88_BG", "rtp91_BG", "rtp93_BG", "rtp94_BG", "rtp95_BG", "rtp96_BG"],
    "SE": ["rtp88_SE", "rtp91_SE", "rtp93_SE", "rtp94_SE", "rtp95_SE", "rtp96_SE"],
    "UK": ["rtp88_UK", "rtp91_UK", "rtp93_UK", "rtp94_UK", "rtp95_UK"],
    "SK": ["rtp88_SK", "rtp91_SK", "rtp93_SK", "rtp94_SK", "rtp95_SK", "rtp96_SK"],
    "DK": ["rtp88_DK", "rtp91_DK", "rtp93_DK", "rtp94_DK", "rtp95_DK", "rtp96_DK"],
    "GR": ["rtp88_GR", "rtp91_GR", "rtp93_GR", "rtp94_GR", "rtp95_GR", "rtp96_GR"],
    "CAON": ["rtp88_CAON", "rtp91_CAON", "rtp93_CAON", "rtp94_CAON", "rtp95_CAON", "rtp96_CAON"],
    "CO": ["rtp88_CO", "rtp91_CO", "rtp93_CO", "rtp94_CO", "rtp95_CO", "rtp96_CO"],
    "PH": ["rtp91_PH", "rtp93_PH", "rtp94_PH", "rtp95_PH", "rtp96_PH"],
    "ZA": ["rtp88_ZA", "rtp91_ZA", "rtp93_ZA", "rtp94_ZA", "rtp95_ZA", "rtp96_ZA"]
};

const jurisdictionToVariantsFD = {
    "NOT_APPLICABLE": ["rtp-variant88", "rtp-variant91", "rtp-variant93", "rtp-variant94", "rtp-variant95", "rtp-variant96"]
};

const jurisdictionToVariantsDR = {
    "NOT_APPLICABLE": ["rtp-variant88", "rtp-variant91", "rtp-variant93", "rtp-variant94", "rtp-variant95", "rtp-variant96"],
    "SOCIAL": ["rtp88_SOCIAL", "rtp91_SOCIAL", "rtp93_SOCIAL", "rtp94_SOCIAL", "rtp95_SOCIAL", "rtp96_SOCIAL"]
};

const SUPPORTED_RTPS = ['88', '91', '93', '94', '95', '96'];

const MIN_BASE_BET_GROUPS = [
    { variant: "min_base_bet_NOT_APPLICABLE", jurisdictions: ["NOT_APPLICABLE"] },
    { variant: "min_base_bet_NL", jurisdictions: ["NL"] },
    { variant: "min_base_bet_Thorne+Realm", jurisdictions: ["NOT_APPLICABLE", "MT", "SE"] },
    { variant: "min_base_bet_HR", jurisdictions: ["HR"] }
];

const checkedByDefault = new Set(["NOT_APPLICABLE", "SOCIAL"]);
const jurisdictionContainer = document.getElementById("jurisdictionContainer");
jurisdictionContainer.className = "row";

for (const jur in jurisdictionToVariants) {
    const colDiv = document.createElement("div");
    colDiv.className = "col-2 mb-2";

    const formCheckDiv = document.createElement("div");
    formCheckDiv.className = "form-check";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `jur_${jur}`;
    checkbox.value = jur;
    checkbox.className = "form-check-input";

    if (checkedByDefault.has(jur)) checkbox.checked = true;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = jur;
    label.className = "form-check-label";

    formCheckDiv.appendChild(checkbox);
    formCheckDiv.appendChild(label);
    colDiv.appendChild(formCheckDiv);
    jurisdictionContainer.appendChild(colDiv);
}

let originalData = {};

document.getElementById("fileInput").addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (evt) {
        try {
            originalData = JSON.parse(evt.target.result);
            document.getElementById("output").value = JSON.stringify(originalData, null, 2);
            alert("JSON loaded successfully!");
        } catch (err) {
            alert("Invalid JSON file.");
            }
    };

    reader.readAsText(file);
});

function isJurChecked(jur) {
    const checkbox = document.getElementById(`jur_${jur}`);
    return !!checkbox && checkbox.checked;
}

function readGameName() {
    const gameName = document.getElementById("gameName").value.trim();
    if (!gameName) {
        alert("Enter a game name");
        return null;
    }
    if (gameName === "__proto__") {
        alert('"__proto__" is a reserved name and cannot be used as a gameCode.');
        return null;
    }
    return gameName;
}

function buildPathsFromInputs() {
    const paths = {};
    SUPPORTED_RTPS.forEach(rtp => {
        paths[rtp] = document.getElementById(`path${rtp}`).value.trim();
    });
    return paths;
}

function getRtpFromVariant(variant) {
    const match = variant.match(/(\d{2})/);
    return match ? match[1] : null;
}

function ensureGameEntry(variant, gameName) {
    if (!originalData[variant]) originalData[variant] = { games: {} };
    if (!originalData[variant].games[gameName]) {
        originalData[variant].games[gameName] = { jurisdictions: {} };
    } else if (!originalData[variant].games[gameName].jurisdictions) {
        originalData[variant].games[gameName].jurisdictions = {};
    }
    return originalData[variant].games[gameName];
}

function sortGamesByName(variantData) {
    const sortedGames = {};
    Object.keys(variantData.games).sort().forEach(key => {
        sortedGames[key] = variantData.games[key];
    });
    variantData.games = sortedGames;
}

function applyMinBaseBetGroups(gameName) {
    if (!document.getElementById('minBaseBetCheckbox').checked) return;

    const rawValue = document.getElementById('minBaseBetValue').value.trim();
    if (!/^-?\d+(\.\d+)?$/.test(rawValue)) {
        alert("Min base bet value must be a number.");
        return;
    }
    const value = Number(rawValue);

    MIN_BASE_BET_GROUPS.forEach(({ variant, jurisdictions }) => {
        if (!jurisdictions.every(isJurChecked)) return;

        const gameEntry = ensureGameEntry(variant, gameName);
        jurisdictions.forEach(jur => {
            gameEntry.jurisdictions[jur] = { defaultBaseBet: { value } };
        });
        sortGamesByName(originalData[variant]);
    });
}

function getBaseBetVariantsForJur(jur) {
    return MIN_BASE_BET_GROUPS
        .filter(group => group.jurisdictions.includes(jur))
        .map(group => group.variant);
}

function addGameForJurisdictionMap(jurisdictionMap, gameName, paths) {
    let addedAnything = false;

    Object.keys(jurisdictionMap).forEach(jur => {
        if (!isJurChecked(jur)) return;

        jurisdictionMap[jur].forEach(variant => {
            const rtp = getRtpFromVariant(variant);
            const path = rtp ? paths[rtp] : null;
            if (!path) return;

            const gameEntry = ensureGameEntry(variant, gameName);
            gameEntry.jurisdictions[jur] = { gameModelFile: path };
            sortGamesByName(originalData[variant]);
            addedAnything = true;
        });
    });

    return addedAnything;
}

function writeOutputAndWarnIfEmpty(addedAnything) {
    if (!addedAnything) {
        alert("Nie dodano żadnego wpisu — sprawdź czy zaznaczono jurysdykcje i podano ścieżki.");
    }
    document.getElementById("output").value = JSON.stringify(originalData, null, 2);
}

function addGameKL() {
    const gameName = readGameName();
    if (!gameName) return;

    const paths = buildPathsFromInputs();
    let addedAnything = false;

    Object.keys(jurisdictionToVariants).forEach(jur => {
        if (!isJurChecked(jur)) return;

        jurisdictionToVariants[jur].forEach(variant => {
            const isHighVariant = variant.includes("94+");
            let resolvedPath;

            if (isHighVariant) {
                resolvedPath = paths["94"] === paths["93"] ? paths["95"] : paths["94"];
            } else {
                const rtp = getRtpFromVariant(variant);
                resolvedPath = rtp ? paths[rtp] : null;
            }
            if (!resolvedPath) return;

            const gameEntry = ensureGameEntry(variant, gameName);
            gameEntry.jurisdictions[jur] = { gameModelFile: resolvedPath };
            sortGamesByName(originalData[variant]);
            addedAnything = true;
        });
    });

    applyMinBaseBetGroups(gameName);

    writeOutputAndWarnIfEmpty(addedAnything);
}

function addGameFD() {
    const gameName = readGameName();
    if (!gameName) return;

    const paths = buildPathsFromInputs();
    const addedAnything = addGameForJurisdictionMap(jurisdictionToVariantsFD, gameName, paths);

    writeOutputAndWarnIfEmpty(addedAnything);
}

function addGameDR() {
    const gameName = readGameName();
    if (!gameName) return;

    const paths = buildPathsFromInputs();
    const addedAnything = addGameForJurisdictionMap(jurisdictionToVariantsDR, gameName, paths);

    writeOutputAndWarnIfEmpty(addedAnything);
}

function copyOutput() {
        const output = document.getElementById("output");
        navigator.clipboard.writeText(output.value)
          .then(() => alert("JSON copied to clipboard! 😊"))
          .catch(err => alert("Copy failed 😞"));
    }

function autofillPaths() {
    const sample = document.getElementById('samplepath').value.trim();
    if (!sample) {
        alert('Wklej najpierw przykładową ścieżkę w pole "default path".');
        return;
    }

    const match = sample.match(/^(.*_)(\d{2,3})(\.json)$/i);
    if (!match) {
        alert('Nie udało się rozpoznać numeru RTP w podanej ścieżce.\nUpewnij się, że ścieżka kończy się np. "..._91.json".');
        return;
    }

    const [, prefix, rtpInSample, suffix] = match;

    if (!SUPPORTED_RTPS.includes(rtpInSample)) {
        const proceed = confirm(
            `Numer "${rtpInSample}" w podanej ścieżce nie jest znanym RTP-em (${SUPPORTED_RTPS.join('/')}).\nKontynuować autofill mimo to?`
        );
        if (!proceed) return;
    }

    SUPPORTED_RTPS.forEach(rtp => {
        const inputEl = document.getElementById('path' + rtp);
        if (inputEl) {
            inputEl.value = prefix + rtp + suffix;
        }
    });
}

function removeGame() {
    const gameName = readGameName();
    if (!gameName) return;

    let removedAnything = false;

    Object.keys(jurisdictionToVariants).forEach(jur => {
        if (!isJurChecked(jur)) return;

        jurisdictionToVariants[jur].forEach(variant => {
            const variantData = originalData[variant];
            if (!variantData || !variantData.games || !variantData.games[gameName]) return;

            const jurisdictions = variantData.games[gameName].jurisdictions;
            if (jurisdictions && jurisdictions[jur]) {
                delete jurisdictions[jur];
                removedAnything = true;
            }

            if (jurisdictions && Object.keys(jurisdictions).length === 0) {
                delete variantData.games[gameName];
            }
        });

        removeBaseBetForJur(jur, gameName);
    });

    if (!removedAnything) {
        alert("Nie znaleziono wpisów do usunięcia dla podanych kryteriów.");
    }

    document.getElementById("output").value = JSON.stringify(originalData, null, 2);
}

function removeBaseBetForJur(jur, gameName) {
    getBaseBetVariantsForJur(jur).forEach(variant => {
        const variantData = originalData[variant];
        if (!variantData || !variantData.games || !variantData.games[gameName]) return;

        const jurisdictions = variantData.games[gameName].jurisdictions;
        if (jurisdictions && jurisdictions[jur]) {
            delete jurisdictions[jur];
        }
        if (jurisdictions && Object.keys(jurisdictions).length === 0) {
            delete variantData.games[gameName];
        }
    });
}
