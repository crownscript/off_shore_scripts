(function () {
  function getAmounts() {
    return window.SCRIPT_AMOUNTS || {
      topLevels: { gold: 100, silver: 75, bronze: 50 },
      rebuttals: { level1: 45, level2: 35 },
      minimum: 25,
    };
  }

  function formatAmount(amount) {
    return Number(amount).toLocaleString("en-US", {
      maximumFractionDigits: 0,
    });
  }

  function previousDonationAmount(securityPhrase) {
    const phrase = String(securityPhrase || "");
    const numberMatch = phrase.match(/(\d+\.\d+|\d+)/);
    if (!numberMatch) return 0;

    const amount = Number.parseFloat(numberMatch[0]);
    return Number.isNaN(amount) ? 0 : Math.floor(amount);
  }

  function roundToNearestFive(amount) {
    return Math.round(amount / 5) * 5;
  }

  function calculateDonationTiers(baseAmount) {
    return {
      bronze: roundToNearestFive(baseAmount * 2),
      silver: roundToNearestFive(baseAmount * 2.5),
      gold: roundToNearestFive(baseAmount * 3),
    };
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = formatAmount(value);
  }

  window.getPreviousDonationAmount = previousDonationAmount;

  window.applyAmountsToDOM = function applyAmountsToDOM(securityPhrase) {
    const amounts = getAmounts();
    const previousAmount = previousDonationAmount(securityPhrase);
    const tiers = previousAmount >= 50
      ? calculateDonationTiers(previousAmount)
      : amounts.topLevels;

    setText("goldAmount", tiers.gold);
    setText("silverAmount", tiers.silver);
    setText("bronzeAmount", tiers.bronze);
  };
})();
