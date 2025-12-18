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

      <table class="notif-table">
        <tbody>
          <!-- Gestion globale -->
          <tr>
          <td class="notif-category-title notif-text">Gestion de toutes les notifications</td>
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
          <td colspan="2" class="notif-category-title notif-text">Variation du portefeuille</td>
        </tr>

        <tr>
          <td class="notif-text">Gains</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.gains" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td class="notif-text">Pertes</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.pertes" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <!-- Communauté -->
        <tr>
          <td colspan="2" class="notif-category-title notif-text">Communauté</td>
        </tr>

        <tr>
          <td class="notif-text">Recommandations d’articles</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.recommandations_articles" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td class="notif-text">Commentaires sous vos articles</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.commentaires" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td class="notif-text">Réponses à vos commentaires</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.reponses" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td class="notif-text">Demandes de suivi</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.demandes_suivi" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <tr>
          <td class="notif-text">Activités des personnes suivies</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.activites_suivies" @change="updatePortfolioGroup" />
          </td>
        </tr>

        <!-- Recommandations crypto -->
        <tr>
          <td colspan="2" class="notif-category-title notif-text">Recommandations crypto</td>
        </tr>

        <tr>
          <td class="notif-text">Recommandations du jour</td>
          <td class="toggle-cell">
            <ToggleSwitch v-model="notificationsPortfolio.recommandations_crypto" @change="updatePortfolioGroup" />
          </td>
        </tr>
        </tbody>
      </table>
    </section>

    <button class="btn-save" @click="$router.push('/')">
      Enregistrer les modifications
    </button>

  </div>
</template>

<script>
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import Highcharts from "highcharts";
import { useUserStore } from '@/stores/userStore';

export default {
  name: "SettingsView",
  components: { ToggleSwitch },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

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
        // Valeurs fictives revues pour un total proche de 1 000 $US
        { symbol: "BTC", name: "Bitcoin", value: 400, change24h: 53 },
        { symbol: "ETH", name: "Ethereum", value: 250, change24h: 21 },
        { symbol: "SOL", name: "Solana", value: 150, change24h: -12 },
        { symbol: "BNB", name: "BNB", value: 80, change24h: 6 },
        { symbol: "ADA", name: "Cardano", value: 60, change24h: -3 },
        { symbol: "XRP", name: "XRP", value: 40, change24h: 1 },
        { symbol: "AVAX", name: "Avalanche", value: 20, change24h: 14 },
        { symbol: "DOT", name: "Polkadot", value: 30, change24h: 4 },
        { symbol: "MATIC", name: "Polygon", value: 20, change24h: -2 }
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
          value: "+ 120 $US",
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
          value: "1 000 $US",
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

    // Charger le dashboard depuis le store Pinia
    if (this.userStore.dashboardConfig && this.userStore.dashboardConfig.length > 0) {
      this.dashboard = [...this.userStore.dashboardConfig];
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

    // Observer les changements de classe sur <html> pour re-render en mode clair/sombre
    try {
      this._themeObserver = new MutationObserver(mutations => {
        for (const m of mutations) {
          if (m.type === 'attributes' && m.attributeName === 'class') {
            this.renderAllCharts();
            break;
          }
        }
      });
      this._themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    } catch (e) {
      // Fallback: au cas où MutationObserver ne serait pas disponible
      document.addEventListener('transitionend', this.renderAllCharts, { once: false });
    }

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
    if (this._themeObserver && typeof this._themeObserver.disconnect === 'function') {
      this._themeObserver.disconnect();
    }
    document.removeEventListener('transitionend', this.renderAllCharts);
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
      // Sauvegarder dans le store Pinia (qui synchronise avec localStorage)
      this.userStore.updateDashboardConfig(this.dashboard);
    },

    openAddMenu(index) {
      this.addMenuIndex = this.addMenuIndex === index ? null : index;
    },

    addWidget(widgetId) {
      if (this.addMenuIndex === -1) {
        // Ajout global: garder le menu ouvert pour permettre plusieurs ajouts
        if (!this.dashboard.includes(widgetId)) {
          this.dashboard.push(widgetId);
        }
        this.saveDashboard();
        this.renderAllCharts();
        return;
      } else if (this.addMenuIndex !== null) {
        // Remplacement d'un slot spécifique: fermer le menu après sélection
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
      const textColor = isDark ? '#dcdcdc' : '#2b2b2b';
      const titleColor = isDark ? '#e9e9e9' : '#4a3a00';
      const gridColor = isDark ? '#666' : '#e4cfa6';
      const labelWeight = isDark ? '600' : '700';
      const labelSize = isDark ? '12px' : '13px';
      const titleWeight = isDark ? '600' : '700';

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
          title: { text: "Temps", style: { color: titleColor, fontWeight: titleWeight } },
          labels: { style: { color: textColor, fontWeight: labelWeight, fontSize: labelSize } },
          lineColor: gridColor,
          tickColor: gridColor,
          tickWidth: 1
        },

        yAxis: {
          title: { text: "$US", style: { color: titleColor, fontWeight: titleWeight } },
          labels: { style: { color: textColor, fontWeight: labelWeight, fontSize: labelSize } },
          gridLineColor: gridColor,
          gridLineWidth: 1,
          tickWidth: 1,
          tickColor: gridColor
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
      this.tablePageByWidget[widgetId] = p;
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

<style scoped>
/* -------- GLOBAL -------- */
.settings-container {
  width: 90%;
  max-width: 950px;
  margin: auto;
  padding: 30px 0;
  color: #3b3b3b;
  font-family: "Segoe UI", sans-serif;
}

.page-title {
  font-size: 28px;
  color: #d18c00;
}

.success-message {
  color: #2ecc71;
  margin-bottom: 20px;
}

/* -------- CARDS -------- */
.card {
  background: #fff8e6;
  border: 1px solid #dcb676;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
}

.card h2 {
  color: #d18c00;
  margin-bottom: 12px;
}

/* -------- BUTTONS -------- */
.btn-primary,
.btn-delete,
.btn-cancel,
.btn-reset,
.btn-save {
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  display: block;
  width: 90%;
  max-width: 300px;
  margin: 12px auto 0 auto;
}

.btn-primary {
  background: #e0a74f;
}
.btn-primary:hover {
  background: #cf8e2f;
}

.btn-reset {
  background: #c94f4f;
  max-width: 220px;
}
.btn-reset:hover {
  background: #a73f3f;
}

.btn-delete {
  background: #ff6b6b;
}
.btn-delete:hover {
  background: #e04848;
}

.btn-cancel {
  background: #b6b6b6;
}
.btn-cancel:hover {
  background: #8f8f8f;
}

.btn-save {
  background: #d18c00;
  max-width: 350px;
}
.btn-save:hover {
  background: #b67500;
}

/* -------- INPUTS -------- */
input {
  width: 60%;
  padding: 10px;
  border: 1px solid #cdaa6f;
  border-radius: 6px;
  margin: 6px 0 12px;
}

/* -------- PORTFOLIOS -------- */
.wallet-list {
  margin-top: 10px;
}

.wallet-item {
  background: #ffe9c4;
  border: 1px solid #d4b07a;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  position: relative;
}

.wallet-delete {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 3px 7px;
  cursor: pointer;
}

.wallet-delete:hover {
  background: #d9534f;
}

.wallet-success {
  color: #2ecc71;
  margin-top: 5px;
}

/* -------- INFO ICONS -------- */
.info-icon,
.info-icon-dashboard {
  font-size: 18px;
  margin-left: 6px;
  cursor: help;
  color: #d18c00;
}

/* -------- DASHBOARD GRID -------- */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.dashboard-slot {
  height: 210px;
  position: relative;
}

.dashboard-slot.drag-hover {
  background: #fff3d270;
  border: 2px dashed #d18c00;
  border-radius: 14px;
}

.dash-item {
  background: #ffe9c4;
  border: 2px solid #d4b07a;
  border-radius: 14px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: grab;
}

.dash-item:active {
  cursor: grabbing;
}

.dash-add {
  background: #fff3d2;
  border: 2px dashed #cfa45a;
  border-radius: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8a6d3b;
}
.dash-add:hover {
  background: #ffeec0;
}

/* Add menu */
.add-menu {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  background: #fff8e6;
  border: 1px solid #dcb676;
  border-radius: 12px;
  padding: 12px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.add-menu-item {
  background: #e0a74f;
  color: white;
  padding: 6px 10px;
  margin: 5px 0;
  border-radius: 8px;
  cursor: pointer;
}
.add-menu-item:hover {
  background: #cf8e2f;
}

/* ------- DARK MODE (liste d'ajout) ------- */
html.dark .dash-add,
:root.dark .dash-add {
  background: #2b2b2b !important;
  border-color: #7a5600 !important;
  color: #e9e9e9 !important;
}

html.dark .add-menu,
:root.dark .add-menu {
  background: #2b2b2b !important;
  border-color: #7a5600 !important;
  color: #e9e9e9 !important;
}

html.dark .add-menu p,
:root.dark .add-menu p {
  color: #f0f0f0 !important;
}

html.dark .add-menu-item,
:root.dark .add-menu-item {
  background: #b67500 !important;
  color: #ffffff !important;
  border-color: #cfa45a !important;
}

html.dark .add-menu-item:hover,
:root.dark .add-menu-item:hover {
  background: #cf8e2f !important;
}

/* -------- WIDGETS : TITRES -------- */
.widget-title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #7a5600;
  margin-bottom: 10px;
}

/* -------- WIDGET NUMBER -------- */
.widget-number {
  text-align: center;
}

.widget-value {
  font-size: 30px;
  font-weight: bold;
  margin: 8px 0;
}

.mini-table {
  width: 100%;
  font-size: 13px;
}

.mini-table td {
  padding: 3px 5px;
}

.mini-table .right {
  text-align: right;
}

/* -------- WIDGET TABLE -------- */
.widget-table table {
  width: 100%;
}
.widget-table td {
  border-bottom: 1px solid #e4cfa6;
  padding: 5px 8px;
}

.widget-table .right {
  text-align: right;
}

/* Pagination */
.table-pagination {
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
}
.table-pagination button {
  background: #e0a74f;
  color: white;
  border-radius: 6px;
  border: none;
  padding: 3px 6px;
  cursor: pointer;
}
.table-pagination button:hover {
  background: #cf8e2f;
}

/* -------- WIDGET CHART -------- */
.chart-controls {
  text-align: center;
  margin-bottom: 4px;
}

.crypto-select {
  background: transparent;
  border: 1px solid #cfa45a;
  border-radius: 6px;
  padding: 4px 6px;
  color: #7a5600;
  font-weight: bold;
}

.chart-container {
  height: 150px;
}

/* -------- NOTIFICATIONS -------- */

/* Header group (Toutes / Aucune / Personnalisé) */
.notif-group-selector {
  display: flex;
  gap: 10px;
  margin: 12px 0;
}

.notif-group-selector button {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #cfa45a;
  background: #ecd8a5;
  color: #7a5600;
  cursor: pointer;
}

.notif-group-selector button.active {
  background: #d18c00;
  color: white;
  font-weight: bold;
}

.notif-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.notif-table tr {
  border-bottom: 1px solid #d4b07a;
}

.notif-table td {
  padding: 10px 6px;
  font-size: 16px;
  color: #6a4d1c;
}

.notif-category-title {
  padding-top: 15px;
  padding-bottom: 4px;
  font-weight: bold;
  color: #d18c00;
}

.toggle-cell {
  display: flex;
  justify-content: flex-end;
}

/* -------- RESPONSIVE -------- */
@media (max-width: 900px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-slot {
    height: auto;
    min-height: 220px;
  }
  .dash-item {
    height: auto;
  }
  .chart-container {
    height: 190px !important;
  }
}


/* Ligne d’en-tête avec boutons intégrés */
.notif-header-row td {
  background: var(--notif-bg);
  padding: 12px 8px;
}

.notif-header-with-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notif-category-title-inline {
  font-weight: bold;
  color: var(--text-title);
  font-size: 18px;
}

/* Boutons inline */
.notif-group-selector-inline {
  display: flex;
  gap: 8px;
}

.notif-group-selector-inline button {
  padding: 6px 14px;
  border-radius: 20px;
  background: #ecd8a5;
  border: 1px solid #cfa45a;
  color: #7a5600;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
}

.notif-group-selector-inline button.active {
  background: #d18c00;
  color: white;
}

</style>
