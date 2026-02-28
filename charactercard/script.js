const character = {
  name: "Snortleblat",
  characterClass: "Swamp Beast Diplomat",
  level: 5,
  health: 40,
  image: "image.png",

  attacked() {
    if (this.health <= 0) return;

    this.health -= 20;

    if (this.health <= 0) {
      this.health = 0;
      updateCard();
      alert(`💀 ${this.name} has died!`);
      document.getElementById("btn-attacked").disabled = true;
      document.getElementById("btn-levelup").disabled = true;
    } else {
      updateCard();
    }
  },

  levelUp() {
    this.level += 1;
    updateCard();
  }
};

function updateCard() {
  document.getElementById("card-name").textContent = character.name;
  document.getElementById("card-class").textContent = character.characterClass;
  document.getElementById("card-level").textContent = character.level;
  document.getElementById("card-health").textContent = character.health;
  document.getElementById("card-image").src = character.image;
}

// Initialize card on page load
updateCard();
