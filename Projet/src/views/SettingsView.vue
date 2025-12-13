<template>
  <div class="settings-container">

    <h1 class="page-title">Paramètres de compte</h1>
    <br/>

    <!-- Message succès après inscription -->
    <p class="success-message" v-if="showSuccessMessage">
      Votre compte a été créé avec succès.
    </p>

    <!-- Informations du compte -->
    <section class="card">
      <h2>Informations du compte</h2>

      <div v-if="!editing">
        <p><strong>Pseudo :</strong> {{ userPseudo }}</p>
        <p><strong>Email :</strong> {{ userEmail }}</p>

        <br/>

        <button class="btn-primary" @click="editing = true">
          Modifier mes informations
        </button>
      </div>

      <div v-else>
        <label>Pseudo</label>
        <br/>
        <input type="text" v-model="userPseudo" />
        <br/>

        <label>Email</label>
        <br/>
        <input type="email" v-model="userEmail" />
        <br/>

        <label>Nouveau mot de passe</label>
        <br/>
        <input type="password" v-model="newPassword"
               placeholder="Laisser vide pour garder l'ancien" />

        <button class="btn-primary" @click="updateAccount">
          Enregistrer les modifications
        </button>
        <br/>

        <!-- Suppression compte -->
        <section class="card delete-section">
          <h2>Voulez-vous supprimer votre compte ?</h2>
          <p class="delete-warning">Cette action est irréversible. Toutes vos données seront supprimées.</p>
          <button class="btn-delete" @click="deleteAccount">Supprimer mon compte</button>
        </section>

        <button class="btn-cancel" @click="cancelEdit">Annuler</button>
      </div>
    </section>


    <!-- Connexion portefeuille(s) -->
    <section class="card">
      <h2>
        Connexion au(x) portefeuille(s)
        <span class="info-icon"
          title="Un portefeuille crypto est une adresse unique.
La clé de portefeuille permet d'accéder à vos fonds.
Ne partagez JAMAIS votre clé privée.
Les données affichées ici sont fictives.">
          ⓘ
        </span>
      </h2>

      <label>Entrer la ou les clé(s) de portefeuille(s) </label>
      <input type="text" v-model="walletKey" placeholder="Clé de portefeuille" />

      <button class="btn-primary" @click="addWallet">Ajouter</button>
      <p v-if="walletAddedMessage" class="wallet-success">{{ walletAddedMessage }}</p>

      <div class="wallet-list">
        <div v-for="(wallet, index) in wallets" :key="index" class="wallet-item">
          {{ wallet }}
          <button class="wallet-delete" @click="deleteWallet(index)">✖</button>
        </div>
      </div>
    </section>


    <!-- -------------------- TABLEAU DE BORD -------------------- -->
    <section class="card">
      <h2 class="page-title">
        Personnaliser le tableau de bord
        <span class="info-icon-dashboard"
          title="Votre tableau de bord affiche vos indicateurs clés.
Les données visibles ici sont fictives et servent uniquement d'exemple.
Vous pouvez ajouter, retirer ou déplacer les éléments.">
          ⓘ
        </span>
      </h2>

      <p class="hint">Glisser pour déplacer.</p>

      <button class="btn-reset" @click="resetDashboard">
        Réinitialiser le tableau de bord
      </button>
      <br/>

      <div class="dashboard-grid">

        <!-- WIDGETS EXISTANTS -->
        <div
          v-for="(widgetId, index) in dashboard"
          :key="index"
          class="dashboard-slot"
          :class="{ 'drag-hover': hoverIndex === index }"
          @dragover.prevent="onDragOver(index)"
          @drop="onDrop(index)"
          @touchmove.prevent="onTouchMove($event)"
          @touchend="onTouchEnd"
        >
          <div v-if="widgetId" class="dash-item"
            draggable="true"
            @dragstart="onDragStart(index)"
            @dragend="onDragEnd"
            @touchstart="onTouchStart(index)">

            <button class="delete-widget" @click="removeWidget(index)">✖</button>

            <!-- -------- WIDGET NUMBER -------- -->
            <div v-if="allWidgets[widgetId].type === 'number'" class="widget-number">
              <div class="widget-content">
                <h3 class="widget-title">{{ allWidgets[widgetId].title }}</h3>
                <p class="widget-value">{{ allWidgets[widgetId].value }}</p>

                <table class="mini-table">
                  <tr v-for="row in getNumberWidgetPageRows(widgetId)" :key="row.key">
                    <td>{{ row.label }}</td>
                    <td class="right">{{ row.value }}</td>
                  </tr>
                </table>
              </div>

              <div class="table-pagination"
                v-if="getNumberWidgetTotalPages(widgetId) > 1">
                <button @click="goToTablePage(widgetId, 1)">&laquo;</button>
                <button @click="changeTablePage(widgetId, -1)">&lsaquo;</button>

                <span>
                  Page {{ tablePageByWidget[widgetId] || 1 }}
                  / {{ getNumberWidgetTotalPages(widgetId) }}
                </span>

                <button @click="changeTablePage(widgetId, 1)">&rsaquo;</button>
                <button @click="goToTablePage(widgetId, getNumberWidgetTotalPages(widgetId))">&raquo;</button>
              </div>
            </div>


            <!-- -------- WIDGET CHART -------- -->
            <div v-else-if="allWidgets[widgetId].type === 'chart'" class="widget-chart">

              <h3 class="widget-title">{{ allWidgets[widgetId].name }}</h3>

              <div class="chart-controls">
                <label>
                  Crypto :
                  <select
                    v-model="selectedCryptoByWidget[widgetId]"
                    @change="onChartCryptoChange(widgetId, index)"
                    class="crypto-select"
                  >
                    <option
                      v-for="crypto in ownedCryptos"
                      :key="crypto.symbol"
                      :value="crypto.symbol"
                    >
                      {{ crypto.symbol }}
                    </option>
                  </select>
                </label>
              </div>

              <div :id="'chart-' + index" class="chart-container"></div>
            </div>


            <!-- -------- WIDGET TABLE -------- -->
            <div v-else-if="allWidgets[widgetId].type === 'table'" class="widget-table">
              <div class="widget-content">
                <h3 class="widget-title">{{ allWidgets[widgetId].title }}</h3>

                <table>
                  <tr v-for="row in getTablePageRows(widgetId)" :key="row.key">
                    <td>{{ row.label }}</td>
                    <td class="right">{{ row.value }}</td>
                  </tr>
                </table>
              </div>

              <div class="table-pagination"
                   v-if="getTotalTablePages(widgetId) > 1">
                <button @click="goToTablePage(widgetId, 1)">&laquo;</button>
                <button @click="changeTablePage(widgetId, -1)">&lsaquo;</button>

                <span>
                  Page {{ tablePageByWidget[widgetId] || 1 }}
                  / {{ getTotalTablePages(widgetId) }}
                </span>

                <button @click="changeTablePage(widgetId, 1)">&rsaquo;</button>
                <button @click="goToTablePage(widgetId, getTotalTablePages(widgetId))">&raquo;</button>
              </div>
            </div>

          </div>
        </div>


        <!-- -------- BOUTON “AJOUTER UN ÉLÉMENT” -------- -->
        <div class="dashboard-slot">
          <div class="dash-add" @click="openAddMenu(-1)">
            Ajouter un élément
          </div>

          <div v-if="addMenuIndex === -1" class="add-menu">
            <p>Éléments disponibles :</p>

            <button
              v-for="(widgetObj, key) in availableWidgets"
              :key="key"
              @click="addWidget(key)"
              class="add-menu-item"
            >
              {{ widgetObj.title || widgetObj.name }}
            </button>
          </div>
        </div>

      </div>
    </section>


    <!-- ------------------------------------------------------------- -->
    <!-- ------------------------ NOTIFICATIONS ---------------------- -->
    <!-- ------------------------------------------------------------- -->
    <section class="card">
      <h2>Personnaliser les notifications</h2>
      <p class="hint">Les notifications se font uniquement par email.</p>

      <table colspan="2" class="notif-table">

        <!-- Gestion globale -->
        <tr>
          <td class="notif-category-title">Gestion de toutes les notifications</td>
          <td>
            <div class="toggle-cell">
              <div class="notif-group-selector-inline">
                <button
                  :class="{ active: notificationGroupPortfolio === 'all' }"
                  @click="setPortfolioGroup('all')"
                >Toutes</button>

                <button
                  :class="{ active: notificationGroupPortfolio === 'none' }"
                  @click="setPortfolioGroup('none')"
                >Aucune</button>

                <button
                  :class="{ active: notificationGroupPortfolio === 'custom' }"
                  disabled
                >Personnalisé</button>
              </div>
            </div>
          </td>
        </tr>

        <!-- Variation portefeuille -->
        <tr>
          <td class="notif-category-title">Variation du portefeuille</td>
        </tr>

        <tr>
          <td>Gains</td>
          <td class="toggle-cell">
            <Toggle
              v-model="notificationsPortfolio.gains"
              @change="updatePortfolioGroup"
            />
          </td>
        </tr>

        <tr>
          <td>Pertes</td>
          <td class="toggle-cell">
            <Toggle
              v-model="notificationsPortfolio.pertes"
              @change="updatePortfolioGroup"
            />
          </td>
        </tr>

        <!-- Communauté -->
        <tr>
          <td colspan="2" class="notif-category-title">Communauté</td>
        </tr>

        <tr>
          <td>Recommandations d’articles</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.recommandations_articles" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td>Commentaires sous vos articles</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.commentaires" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td>Réponses à vos commentaires</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.reponses" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td>Demandes de suivi</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.demandes_suivi" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td>Activités des personnes suivies</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.activites_suivies" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <!-- Reco crypto -->
        <tr>
          <td colspan="2" class="notif-category-title">Recommandations crypto</td>
        </tr>

        <tr>
          <td>Recommandations du jour</td>
          <td class="toggle-cell">
            <Toggle v-model="notificationsPortfolio.recommandations_crypto" @change="updatePortfolioGroup" />
          </td>
        </tr>

      </table>
    </section>

    <button class="btn-save" @click="$router.push('/')">
      Enregistrer les modifications
    </button>

  </div>
</template>

<script>
import Toggle from "@/components/Toggle.vue";
import Highcharts from "highcharts";

export default {
  name: "SettingsView",
  components: { Toggle },

  data() {
    return {
      walletKey: "",
      wallets: [],
      userPseudo: "",
      userEmail: "",
      newPassword: "",
      editing: false,
      showSuccessMessage: false,
      walletAddedMessage: "",
      addMenuIndex: null,

      // Widgets visibles par défaut
      dashboard: [
        "gain24h",
        "gainTotal",
        "evolution24h",
        "performance3d",
        "investDetails"
      ],

      // Cryptos possédées (données fictives)
      ownedCryptos: [
        { symbol: "BTC", name: "Bitcoin", value: 1250, change24h: 53 },
        { symbol: "ETH", name: "Ethereum", value: 820, change24h: 21 },
        { symbol: "SOL", name: "Solana", value: 560, change24h: -12 },
        { symbol: "BNB", name: "BNB", value: 320, change24h: 6 },
        { symbol: "ADA", name: "Cardano", value: 160, change24h: -3 },
        { symbol: "XRP", name: "XRP", value: 110, change24h: 1 },
        { symbol: "AVAX", name: "Avalanche", value: 350, change24h: 14 },
        { symbol: "DOT", name: "Polkadot", value: 190, change24h: 4 },
        { symbol: "MATIC", name: "Polygon", value: 140, change24h: -2 }
      ],

      // Widgets configurables
      allWidgets: {
        gain24h: {
          type: "number",
          title: "Gains / Pertes sur 24h",
          value: "+ 8,54 %",
          detailType: "change24h",
          pageSize: 3
        },
        gainTotal: {
          type: "number",
          title: "Gains / Pertes totales",
          value: "+ 3 240 $US",
          detailType: "value",
          pageSize: 3
        },
        evolution24h: {
          name: "Évolution 24h",
          type: "chart",
          detailType: "24h"
        },
        performance3d: {
          name: "Performance 3 jours",
          type: "chart",
          detailType: "3d"
        },
        performance7d: {
          name: "Performance 7 jours",
          type: "chart",
          detailType: "7d"
        },
        investDetails: {
          type: "table",
          title: "Détails investissements",
          source: "ownedCryptos",
          pageSize: 3
        },
        investTotal: {
          type: "number",
          title: "Total investi",
          value: "2 800 $US",
          detailType: "value",
          pageSize: 3
        },
        cryptoReco: {
          type: "table",
          title: "Recommandations Crypto",
          source: "static",
          pageSize: 2,
          rows: [
            { key: "avax", label: "Avalanche (AVAX)", value: "Tendance : HAUSSE" },
            { key: "link", label: "Chainlink (LINK)", value: "Tendance : FORTE HAUSSE" },
            { key: "dot", label: "Polkadot (DOT)", value: "Stabilité : ÉLEVÉE" },
            { key: "arb", label: "Arbitrum (ARB)", value: "Volatilité : ÉLEVÉE" }
          ]
        }
      },

      // Données simulées pour les graphiques (par crypto)
      chartData: {
        BTC: {
          "24h": [
            102, 104, 101, 99, 100, 103, 105, 107, 108, 110, 109, 108,
            107, 108, 110, 111, 109, 108, 107, 106, 105, 104, 103, 102
          ],
          "3d": [
            102, 101, 103, 106, 105, 107, 110, 111, 112, 110, 108, 107,
            105, 104, 106, 108, 111, 115, 117, 118, 116, 115, 112, 110,
            109, 108, 110, 113, 115, 118, 119, 121, 122, 121, 119, 118,
            116, 117, 119, 120, 122, 121, 119, 118, 117, 118, 121, 123,
            126, 125, 124, 123, 122, 120, 121, 123, 126, 128, 127, 126,
            125, 124, 123, 122, 121, 119, 118, 117
          ],
          "7d": [102, 108, 111, 115, 118, 121, 119]
        },
        ETH: {
          "24h": [
            62, 63, 61, 60, 61, 62, 64, 65, 67, 66, 65, 64,
            63, 64, 66, 67, 68, 67, 66, 65, 64, 63, 62, 61
          ],
          "3d": [
            62, 63, 64, 66, 65, 67, 69, 70, 71, 70, 69, 68,
            67, 66, 65, 67, 69, 71, 72, 73, 72, 70, 69, 68,
            69, 70, 71, 73, 75, 76, 75, 74, 73, 72, 71, 70,
            69, 70, 72, 73, 74, 73, 72, 71, 70, 71, 72, 74,
            75, 76, 75, 74, 73, 72, 73, 74, 75, 77, 76, 75,
            74, 73, 72, 71, 70, 69, 68, 67
          ],
          "7d": [62, 65, 67, 68, 70, 72, 71]
        },
        SOL: {
          "24h": [
            31, 32, 30, 29, 30, 32, 33, 34, 35, 36, 35, 34,
            33, 34, 35, 36, 37, 36, 35, 34, 33, 32, 31, 30
          ],
          "3d": [
            31, 32, 33, 35, 36, 38, 39, 40, 39, 38, 37, 36,
            35, 34, 35, 37, 38, 40, 41, 42, 41, 40, 39, 38,
            37, 38, 39, 41, 42, 43, 42, 41, 40, 39, 38, 37,
            38, 39, 40, 41, 42, 41, 40, 39, 40, 41, 43, 44,
            45, 44, 43, 42, 41, 40, 41, 42, 44, 45, 46, 45,
            44, 43, 42, 41, 40, 39, 38, 37
          ],
          "7d": [31, 34, 36, 37, 39, 41, 40]
        },
        BNB: {
          "24h": [
            45, 46, 44, 43, 44, 46, 47, 48, 49, 50, 49, 48,
            47, 48, 49, 51, 52, 51, 50, 49, 48, 47, 46, 45
          ],
          "3d": [
            45, 46, 47, 49, 50, 52, 53, 54, 53, 52, 51, 50,
            49, 48, 49, 51, 52, 53, 54, 55, 54, 53, 52, 51,
            50, 51, 52, 53, 55, 56, 55, 54, 53, 52, 51, 50,
            51, 52, 53, 54, 55, 54, 53, 52, 53, 54, 55, 57,
            58, 57, 56, 55, 54, 53, 54, 55, 57, 58, 59, 58,
            57, 56, 55, 54, 53, 52, 51, 50
          ],
          "7d": [45, 48, 50, 52, 53, 54, 53]
        }
      },

      // Crypto sélectionnée par widget "chart"
      selectedCryptoByWidget: {},

      // Page courante par widget (tableaux + widgets number)
      tablePageByWidget: {},

      draggingIndex: null,
      hoverIndex: null,

      // Notifications
      notificationGroupPortfolio: "all",

      notificationsPortfolio: {
        gains: true,
        pertes: true,

        recommandations_articles: true,
        commentaires: true,
        reponses: true,
        demandes_suivi: true,
        activites_suivies: true,

        recommandations_crypto: true
      }
    };
  },

  mounted() {
    // Message de succès après inscription
    if (this.$route.query.created === "1") {
      this.showSuccessMessage = true;
      this.$router.replace({ query: {} });
    }

    // Charger l'utilisateur connecté
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) {
      this.userPseudo = current.pseudo;
      this.userEmail = current.email;
    }

    // Charger un dashboard sauvegardé s'il existe
    const savedDash = JSON.parse(localStorage.getItem("dashboard"));
    if (savedDash && Array.isArray(savedDash) && savedDash.length > 0) {
      this.dashboard = savedDash;
    }

    // Générer des données fictives pour les graphiques
    this.generateFakeChartData();

    // Initialiser la crypto sélectionnée pour chaque widget de type chart
    Object.keys(this.allWidgets).forEach(id => {
      if (this.allWidgets[id].type === "chart") {
        this.selectedCryptoByWidget[id] = this.ownedCryptos[0]?.symbol || "BTC";
      }
    });

    // Rendu initial des graphiques
    this.renderAllCharts();

    // Écouter les changements de thème
    window.addEventListener('themeChange', this.renderAllCharts);

    // Initialiser les pages pour les widgets "number"
    this.dashboard.forEach(w => {
      const widget = this.allWidgets[w];
      if (widget && widget.type === "number") {
        if (!this.tablePageByWidget[w]) {
          this.tablePageByWidget[w] = 1;
        }
      }
    });
  },

  beforeUnmount() {
    window.removeEventListener('themeChange', this.renderAllCharts);
  },

  computed: {
    // Widgets disponibles à l'ajout (non présents dans le dashboard)
    availableWidgets() {
      return Object.entries(this.allWidgets)
        .filter(([id]) => !this.dashboard.includes(id))
        .reduce((acc, [id, widget]) => {
          acc[id] = widget;
          return acc;
        }, {});
    }
  },

  methods: {
    /* ---------- Formatages ---------- */
    formatDollar(value) {
      return value.toLocaleString("fr-FR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    },

    formatSigned(value) {
      const sign = value > 0 ? "+" : value < 0 ? "-" : "";
      const abs = Math.abs(value);
      return `${sign}${abs}`;
    },

    /* ---------- Wallets ---------- */
    addWallet() {
      if (this.walletKey.trim() !== "") {
        this.wallets.push(this.walletKey);

        this.walletAddedMessage = "Le portefeuille a bien été ajouté ✔";

        setTimeout(() => {
          this.walletAddedMessage = "";
        }, 3000);

        this.walletKey = "";
      }
    },

    deleteWallet(index) {
      this.wallets.splice(index, 1);
    },

    /* ---------- Compte ---------- */
    updateAccount() {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      let current = JSON.parse(localStorage.getItem("currentUser"));

      const index = users.findIndex(u => u.email === current.email);
      if (index === -1) return;

      users[index].pseudo = this.userPseudo;
      users[index].email = this.userEmail;

      if (this.newPassword.trim() !== "") {
        users[index].password = this.newPassword;
      }

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          pseudo: this.userPseudo,
          email: this.userEmail
        })
      );

      this.newPassword = "";
      this.editing = false;

      alert("Compte mis à jour !");
    },

    deleteAccount() {
      if (!confirm("Voulez-vous vraiment supprimer votre compte ?")) return;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      let current = JSON.parse(localStorage.getItem("currentUser"));

      users = users.filter(u => u.email !== current.email);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("currentUser");

      alert("Votre compte a été supprimé.");
      this.$router.push("/register");
    },

    cancelEdit() {
      const current = JSON.parse(localStorage.getItem("currentUser"));
      if (current) {
        this.userPseudo = current.pseudo;
        this.userEmail = current.email;
      }
      this.newPassword = "";
      this.editing = false;
    },

    /* ---------- Dashboard : reset ---------- */
    resetDashboard() {
      this.dashboard = [
        "gain24h",
        "gainTotal",
        "evolution24h",
        "performance3d",
        "investDetails"
      ];
      this.saveDashboard();
      this.renderAllCharts();
    },

    /* ---------- Drag & Drop (PC) ---------- */
    onDragStart(index) {
      this.draggingIndex = index;
    },

    onDragOver(index) {
      this.hoverIndex = index;
    },

    onDrop(index) {
      if (this.draggingIndex === null) return;

      const temp = this.dashboard[index];
      this.dashboard[index] = this.dashboard[this.draggingIndex];
      this.dashboard[this.draggingIndex] = temp;

      this.draggingIndex = null;
      this.hoverIndex = null;

      this.saveDashboard();
      this.renderAllCharts();
    },

    onDragEnd() {
      this.hoverIndex = null;
    },

    /* ---------- Drag & Drop (mobile) ---------- */
    onTouchStart(index) {
      this.draggingIndex = index;
    },

    onTouchMove(event) {
      const touch = event.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);

      const slot = element && element.closest(".dashboard-slot");
      if (!slot || !slot.parentNode) return;

      const newIndex = Array.from(slot.parentNode.children).indexOf(slot);
      if (newIndex !== -1) {
        this.hoverIndex = newIndex;
      }
    },

    onTouchEnd() {
      if (this.draggingIndex === null || this.hoverIndex === null) {
        this.draggingIndex = null;
        this.hoverIndex = null;
        return;
      }

      const temp = this.dashboard[this.hoverIndex];
      this.dashboard[this.hoverIndex] = this.dashboard[this.draggingIndex];
      this.dashboard[this.draggingIndex] = temp;

      this.draggingIndex = null;
      this.hoverIndex = null;

      this.saveDashboard();
      this.renderAllCharts();
    },

    /* ---------- Gestion dashboard ---------- */
    saveDashboard() {
      localStorage.setItem("dashboard", JSON.stringify(this.dashboard));
    },

    openAddMenu(index) {
      this.addMenuIndex = this.addMenuIndex === index ? null : index;
    },

    addWidget(widgetId) {
      if (this.addMenuIndex === -1) {
        this.dashboard.push(widgetId);
      } else if (this.addMenuIndex !== null) {
        this.dashboard[this.addMenuIndex] = widgetId;
      }
      this.addMenuIndex = null;
      this.saveDashboard();
      this.renderAllCharts();
    },

    /* ---------- Données fictives pour graphiques ---------- */
    generateFakeChartData() {
      const result = {};

      this.ownedCryptos.forEach(crypto => {
        result[crypto.symbol] = {
          "24h": this.generateChartPeriodData(crypto, "24h"),
          "3d": this.generateChartPeriodData(crypto, "3d"),
          "7d": this.generateChartPeriodData(crypto, "7d")
        };
      });

      this.chartData = result;
    },

    generateChartPeriodData(crypto, type) {
      const base = crypto.value || 100;

      if (type === "24h") {
        return Array.from({ length: 24 }, (_, h) => ({
          x: h,
          y: base + (Math.random() * 10 - 5)
        }));
      }

      if (type === "3d") {
        return Array.from({ length: 72 }, (_, h) => ({
          x: h,
          y: base + (Math.random() * 15 - 7)
        }));
      }

      if (type === "7d") {
        return Array.from({ length: 7 }, (_, d) => ({
          x: d,
          y: base + (Math.random() * 20 - 10)
        }));
      }

      return [];
    },

    renderAllCharts() {
      this.$nextTick(() => {
        this.dashboard.forEach((widgetId, index) => {
          const widget = widgetId && this.allWidgets[widgetId];
          if (widget && widget.type === "chart") {
            this.renderChart(widgetId, index);
          }
        });
      });
    },

    renderChart(widgetId, index) {
      const containerId = "chart-" + index;
      const el = document.getElementById(containerId);
      if (!el) return;

      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#f0f0f0' : '#333';

      const widget = this.allWidgets[widgetId];
      const symbol = this.selectedCryptoByWidget[widgetId];
      const data = this.chartData[symbol][widget.detailType];

      let categories = [];

      if (widget.detailType === "24h") {
        categories = [...Array(24).keys()].map(h => `${h}h`);
      }
      if (widget.detailType === "3d") {
        categories = [...Array(72).keys()].map(h => `H${h}`);
      }
      if (widget.detailType === "7d") {
        categories = ["J1", "J2", "J3", "J4", "J5", "J6", "J7"];
      }

      Highcharts.chart(containerId, {
        chart: {
          type: "line",
          height: 140,
          backgroundColor: "transparent"
        },
        title: { text: null },
        credits: { enabled: false },
        legend: { enabled: false },

        xAxis: {
          categories,
          title: { text: "Temps", style: { color: textColor } },
          labels: { style: { color: textColor } }
        },

        yAxis: {
          title: { text: "$US", style: { color: textColor } },
          labels: { style: { color: textColor } }
        },

        tooltip: {
          valueDecimals: 2,
          valueSuffix: " $US",
          backgroundColor: isDark ? '#333' : '#fff',
          style: { color: textColor }
        },

        series: [
          {
            name: symbol,
            data: data.map(p => p.y)
          }
        ]
      });
    },

    onChartCryptoChange(widgetId, index) {
      this.renderChart(widgetId, index);
    },

    /* ---------- Tableaux paginés ---------- */
    getAllTableRows(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return [];

      if (widget.source === "ownedCryptos") {
        return this.ownedCryptos.map(c => ({
          key: c.symbol,
          label: `${c.name} (${c.symbol})`,
          value: `${this.formatDollar(c.value)} $US`
        }));
      }

      if (widget.source === "static") {
        return widget.rows || [];
      }

      return widget.rows || [];
    },

    getTablePageRows(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return [];

      const rows = this.getAllTableRows(widgetId);
      const pageSize = widget.pageSize || 4;
      const currentPage = this.tablePageByWidget[widgetId] || 1;

      const start = (currentPage - 1) * pageSize;
      return rows.slice(start, start + pageSize);
    },

    getTotalTablePages(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return 1;

      // Si widget number -> pagination spécifique
      if (widget.type === "number") {
        return this.getNumberWidgetTotalPages(widgetId);
      }

      const rows = this.getAllTableRows(widgetId);
      const pageSize = widget.pageSize || 4;
      return Math.max(1, Math.ceil(rows.length / pageSize));
    },

    goToTablePage(widgetId, page) {
      const total = this.getTotalTablePages(widgetId);
      const p = Math.min(Math.max(page, 1), total);
      if (this.$set) {
        this.$set(this.tablePageByWidget, widgetId, p);
      } else {
        this.tablePageByWidget[widgetId] = p;
      }
    },

    changeTablePage(widgetId, delta) {
      const current = this.tablePageByWidget[widgetId] || 1;
      this.goToTablePage(widgetId, current + delta);
    },

    /* ---------- Widgets type number (gains/pertes, total, etc.) ---------- */
    getNumberWidgetRows(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return [];

      if (widget.detailType === "change24h") {
        return this.ownedCryptos.map(c => ({
          key: c.symbol,
          label: c.symbol,
          value: `${this.formatSigned(c.change24h)} $US`
        }));
      }

      if (widget.detailType === "value") {
        return this.ownedCryptos.map(c => ({
          key: c.symbol,
          label: c.symbol,
          value: `${this.formatDollar(c.value)} $US`
        }));
      }

      return [];
    },

    getNumberWidgetPageRows(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return [];

      const rows = this.getNumberWidgetRows(widgetId);
      const pageSize = widget.pageSize || 4;
      const currentPage = this.tablePageByWidget[widgetId] || 1;

      const start = (currentPage - 1) * pageSize;
      return rows.slice(start, start + pageSize);
    },

    getNumberWidgetTotalPages(widgetId) {
      const widget = this.allWidgets[widgetId];
      if (!widget) return 1;

      const rows = this.getNumberWidgetRows(widgetId);
      const pageSize = widget.pageSize || 4;

      return Math.max(1, Math.ceil(rows.length / pageSize));
    },

    removeWidget(index) {
      this.dashboard.splice(index, 1);
      this.saveDashboard();
      this.renderAllCharts();
    },

    /* ---------- Notifications variation portefeuille ---------- */
    setPortfolioGroup(mode) {
      this.notificationGroupPortfolio = mode
      const value = mode === "all"

      Object.keys(this.notificationsPortfolio).forEach(key => {
        this.notificationsPortfolio[key] = value
      })
    },

    updatePortfolioGroup() {
      const values = Object.values(this.notificationsPortfolio)

      if (values.every(v => v === true)) {
        this.notificationGroupPortfolio = "all"
      } else if (values.every(v => v === false)) {
        this.notificationGroupPortfolio = "none"
      } else {
        this.notificationGroupPortfolio = "custom"
      }
    }


  }
};
</script>
