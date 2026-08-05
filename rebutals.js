(function () {
  function getAmounts() {
    return window.SCRIPT_AMOUNTS || {
      topLevels: { gold: 100, silver: 75, bronze: 50 },
      rebuttals: { level1: 45, level2: 35 },
      minimum: 25,
    };
  }

  function formatCurrency(amount) {
    return `$${Number(amount).toFixed(0)}`;
  }

  function previousDonationAmount(securityPhrase) {
    if (typeof window.getPreviousDonationAmount === "function") {
      return window.getPreviousDonationAmount(securityPhrase);
    }

    const phrase = String(securityPhrase || "");
    const numberMatch = phrase.match(/(\d+\.\d+|\d+)/);
    if (!numberMatch) return 0;

    const amount = Number.parseFloat(numberMatch[0]);
    return Number.isNaN(amount) ? 0 : Math.floor(amount);
  }

  function roundToNearestFive(amount) {
    return Math.round(amount / 5) * 5;
  }

  function setAll(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = formatCurrency(value);
    });
  }

  window.updateRebuttalAmounts = function updateRebuttalAmounts(securityPhrase) {
    const amounts = getAmounts();
    const previousAmount = previousDonationAmount(securityPhrase);
    let level1 = amounts.rebuttals.level1;
    let level2 = amounts.rebuttals.level2;
    let minimumAmount = amounts.minimum;

    if (previousAmount >= 50) {
      level1 = roundToNearestFive(previousAmount);
      level2 = roundToNearestFive(previousAmount * 0.75);
      minimumAmount = roundToNearestFive(previousAmount * 0.25);

      level1 = Math.max(level1, amounts.minimum);
      level2 = Math.max(level2, amounts.minimum);
      minimumAmount = Math.max(minimumAmount, amounts.minimum);
    }

    setAll(".rebuttal-level1", level1);
    setAll(".rebuttal-level2", level2);
    setAll(".rebuttal-minimum", minimumAmount);
  };
})();
