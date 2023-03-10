import { hooks } from "@bigcommerce/stencil-utils";
import CatalogPage from "./catalog";
import compareProducts from "./global/compare-products";
import FacetedSearch from "./common/faceted-search";
import { createTranslationDictionary } from "../theme/common/utils/translations-utils";
import ITSCategory from "./custom/its-category";
import ToggleCategoryListingView from "./custom/toggle-category-listing-view";
import customGlobal from "./custom/its-global";

export default class Category extends CatalogPage {
  constructor(context) {
    super(context);
    this.validationDictionary = createTranslationDictionary(context);

    /**
     * IntuitSolutions - Custom Category
     */
    this.ITSCategory = new ITSCategory(context);
    this.toggleCategoryListingView = new ToggleCategoryListingView(context);
  }

  setLiveRegionAttributes($element, roleType, ariaLiveStatus) {
    $element.attr({
      role: roleType,
      "aria-live": ariaLiveStatus,
    });
  }

  makeShopByPriceFilterAccessible() {
    if (!$("[data-shop-by-price]").length) return;

    if ($(".navList-action").hasClass("is-active")) {
      $("a.navList-action.is-active").focus();
    }

    $("a.navList-action").on("click", () =>
      this.setLiveRegionAttributes(
        $("span.price-filter-message"),
        "status",
        "assertive"
      )
    );
  }

  onReady() {
    this.arrangeFocusOnSortBy();

    $('[data-button-type="add-cart"]').on("click", (e) =>
      this.setLiveRegionAttributes(
        $(e.currentTarget).next(),
        "status",
        "polite"
      )
    );

    this.makeShopByPriceFilterAccessible();

    compareProducts(this.context);

    if ($("#facetedSearch").length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      hooks.on("sortBy-submitted", this.onSortBySubmit);
    }

    $("a.reset-btn").on("click", () =>
      this.setLiveRegionsAttributes($("span.reset-message"), "status", "polite")
    );

    this.ariaNotifyNoProducts();
    this.validateProductsCount();
  }

  ariaNotifyNoProducts() {
    const $noProductsMessage = $("[data-no-products-notification]");
    if ($noProductsMessage.length) {
      $noProductsMessage.focus();
    }
  }

  initFacetedSearch() {
    const {
      price_min_evaluation: onMinPriceError,
      price_max_evaluation: onMaxPriceError,
      price_min_not_entered: minPriceNotEntered,
      price_max_not_entered: maxPriceNotEntered,
      price_invalid_value: onInvalidPrice,
    } = this.validationDictionary;
    const $productListingContainer = $("#product-listing-container");
    const $facetedSearchContainer = $("#faceted-search-container");
    const productsPerPage = this.context.categoryProductsPerPage;
    const requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage,
          },
        },
      },
      template: {
        productListing:
          this.toggleCategoryListingView.getRequestTemplateType("category"),
        sidebar: "category/sidebar",
      },
      showMore: "category/show-more",
    };

    this.facetedSearch = new FacetedSearch(
      requestOptions,
      (content) => {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);

        $("body").triggerHandler("compareReset");

        $("html, body").animate(
          {
            scrollTop: 0,
          },
          100
        );

        /**
         * IntuitSolutions - Category Update
         */
        this.ITSCategory.afterFacetUpdate();
      },
      {
        validationErrorMessages: {
          onMinPriceError,
          onMaxPriceError,
          minPriceNotEntered,
          maxPriceNotEntered,
          onInvalidPrice,
        },
      }
    );

    $("body").on("productViewModeChanged", () => {
      const NewOpts = {
        config: {
          category: {
            shop_by_price: true,
            products: {
              limit: productsPerPage,
            },
          },
        },
        template: {
          productListing:
            this.toggleCategoryListingView.getRequestTemplateType("category"),
          sidebar: "category/sidebar",
        },
        showMore: "category/show-more",
      };

      this.facetedSearch.updateRequestOptions(NewOpts);
    });
  }

  startGlobal() {
    customGlobal(this.context);
  }

  disableViewDetailButton() {
    $("[view-detail-button]").off("click");
  }

  validateProductsCount() {
    $("#all-sort-select, #all-sort-select-mobile").prop("disabled", true);
    const products = this.context.products;
    const body = this;
    const UUIDcatc = this.context.UUIDcatc;
    const categoryId = this.context.categoryId;
    let num = this.context.num;
    // console.log(products);
    const existProdId = [];
    products.forEach((pr) => {
      existProdId.push(pr.id);
    });
    // console.log(existProdId);
    axios
      .get("https://sufri.autocode.dev/l5t@dev/getATProduct/", {
        params: { id: categoryId },
      })
      .then(function (response) {
        const data = response.data.product;
        let restOfTemplate = [];
        data.forEach((pr) => {
          if (existProdId.includes(pr["id"])) {
            const $item = $(`.product[data-entity-id="${pr["id"]}"]`);
            $item.attr("data-best-selling", `${pr["total_sold"]}`);
            $item.attr("data-date-created", `${pr["date_created"]}`);
          } else {
            restOfTemplate.push({ total_sold: pr["total_sold"], item: pr });
          }
        });
        restOfTemplate = customInsertionSort(
          restOfTemplate,
          restOfTemplate.length
        );

        restOfTemplate.forEach((pr) => {
          const template = constructTemplate(pr["item"], num);
          num = num + 1;
          $("#product-listing-all").append(template);
        });

        $("#loader-block").hide();
        body.configureIsotopeForAll();
        body.startGlobal();
        body.disableViewDetailButton();
      })
      .catch((error) => {
        console.log(error);
      });

    function constructTemplate(pr, num) {
      let img = {};
      for (let i = 0; i < pr["images"].length; i++) {
        if (pr["images"][i]["is_thumbnail"]) {
          img = pr["images"][i];
          break;
        }
      }

      let actionSection = "";
      if (pr["variants"].length > 1) {
        actionSection = `<button type="button" class="button button--primary quickview button--quickview" data-product-id="${pr["id"]}">View Options</button>`;
      } else {
        actionSection = `
            <div class="card-atc js-card-atc">
              <div class="card-atc__section card-atc__section--qty">
                <label for="card-atc__qty-${pr["id"]}-${UUIDcatc}" class="card-atc__label is-srOnly">Quantity:</label>
                <div class="card-atc-increment card-atc-increment--has-buttons js-card-atc-increment">

                  <input type="tel" class="form-input card-atc__input card-atc__input--total js-card-atc__input--total" name="card-atc__qty-${pr["id"]}-${UUIDcatc}" id="card-atc__qty-${pr["id"]}-${UUIDcatc}" value="1" min="1" pattern="[0-9]*" aria-live="polite">
                  <div class="card-atc-button-wrapper">
                    <button class="button button--icon" data-action="inc" type="button">
                      <span class="is-srOnly">Increase Quantity of undefined</span>
                      <span class="icon-wrapper" aria-hidden="true">
                        <svg class="icon">
                          <use xlink:href="#icon-add"></use>
                        </svg>
                      </span>
                    </button>
                    <button class="button button--icon" data-action="dec" type="button">
                      <span class="is-srOnly">Decrease Quantity of undefined</span>
                      <span class="icon-wrapper" aria-hidden="true">
                        <svg class="icon">
                          <use xlink:href="#icon-minus"></use>PP
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-atc__section card-atc__section--action">
                <button type="button" class="card-atc__button button button--primary js-card-atc__button" id="card-atc__add-${pr["id"]}-${UUIDcatc}" data-default-message="Add to Cart" data-wait-message="Adding to cart…" data-added-message="Add to Cart" value="Add to Cart" data-card-add-to-cart="/cart.php?action=add&amp;product_id=${pr["id"]}" data-event-type="product-click">Add to Cart</button>
                <span class="product-status-message aria-description--hidden">Adding to cart… The item has been added</span>
              </div>
          </div>`;
      }

      const template = `
          <div id="product-${pr["id"]}" sort-order="${pr["sort_order"]}" 
          class="product"
          product-data-category="${pr["categories"]}" 
          data-name="${pr["name"]}" 
           data-fake-name="${pr["fake-heading"]}"
          data-rating="${
            pr["reviews_count"] === 0
              ? 0
              : pr["reviews_rating_sum"] / pr["reviews_count"]
          }"
          product-review-count="${pr["reviews_count"]}" 
          data-product-price="${
            pr["variants"].length > 1
              ? pr["variants"][0]["calculated_price"].toFixed(2)
              : pr["calculated_price"].toFixed(2)
          }" 
          data-date-created="${pr["date_created"]}" 
          product-is-featured="${pr["is_featured"]}" 
          data-best-selling="${pr["total_sold"]}"
          data-custom-sort="${pr["custom-sort-order"]}"
          data-custom-num="${num}"
          
          product-filter-IAT=""
          product-filter-FBS=""
          product-filter-FBC=""
          product-filter-CAT=""
          product-filter-NCF=""
          product-filter-NCP=""
          product-filter-NSI=""
          product-filter-HT=""
          >
              <div class="card-wrapper">
                  <article class="card" data-test="card-${pr["id"]}">
                      <figure class="card-figure">
                          <div class="sale-flag-sash" style="display: ${
                            pr["variants"][0].sale_price !== 0
                              ? "block;"
                              : "none;"
                          } "><span class="sale-text">On Sale</span></div>
                          <a href="${pr["custom_url"]["url"]}" 
                          class="card-figure__link" 
                          aria-label="${pr["name"]}, 
                          $${
                            pr["variants"].length > 1
                              ? pr["variants"][0]["calculated_price"].toFixed(2)
                              : pr["calculated_price"].toFixed(2)
                          }">
                              <div class=" card-img-container">
                                  <img src="${img["url_thumbnail"]}" 
                                  alt="img["description"]" title="${
                                    pr["fake-heading"]
                                  }" 
                                  data-sizes="auto" 
                                  srcset="${img["url_standard"]} 80w, 
                                  ${img["url_standard"]} 160w, 
                                  ${img["url_standard"]} 320w, 
                                  ${img["url_standard"]} 640w, 
                                  ${img["url_standard"]} 960w, 
                                  ${img["url_standard"]} 1280w, 
                                  ${img["url_standard"]} 1920w, 
                                  ${img["url_standard"]} 2560w" 
                                  data-srcset="${img["url_standard"]} 80w, 
                                  ${img["url_standard"]} 160w, 
                                  ${img["url_standard"]} 320w, 
                                  ${img["url_standard"]} 640w, 
                                  ${img["url_standard"]} 960w, 
                                  ${img["url_standard"]} 1280w, 
                                  ${img["url_standard"]} 1920w, 
                                  ${img["url_standard"]} 2560w" 
                                  class="card-image lazyautosizes lazyloaded" sizes="248px">
                              </div>
                          </a>
                         <figcaption class="card-figcaption">
                              <div class="card-figcaption-body"></div>
                         </figcaption>
                      </figure>
                      <div class="card-body">
                          <p class="productView-type-title h4" 
                          product-name="">${pr["fake-heading"]}</p>
                          <h3 class="card-title ">
                              <a aria-label="${pr["name"]}, 
                                $${
                                  pr["variants"].length > 1
                                    ? pr["variants"][0][
                                        "calculated_price"
                                      ].toFixed(2)
                                    : pr["calculated_price"].toFixed(2)
                                }" 
                              href="${pr["custom_url"]["url"]}">
                              ${pr["name"]}</a>
                          </h3>
                          <p class="card-text card-text--sku">
                              <span> SKU#: ${pr["sku"]} </span>
                          </p>
                          <div class="card-text card-text--price" data-test-info-type="price">
                              <div class="price-section price-section--withoutTax rrp-price--withoutTax h4" style="display: block;">
                                  <span class="is-srOnly"> MSRP: </span>
                                  <span data-product-rrp-price-without-tax="" class="price price--rrp h5">
                                    ${
                                      pr["variants"][0].sale_price !== 0
                                        ? "$" + pr["variants"][0].retail_price
                                        : ""
                                    }
                                  </span>
                              </div>
                              <div class="price-section price-section--withoutTax non-sale-price--withoutTax h5" style="display: none;">
                                <span class="is-srOnly"> Was: </span>
                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale"></span>
                              </div>
                              <div class="price-section price-section--withoutTax h4">
                                <span class="price-label is-srOnly"></span>
                                <span class="price-now-label is-srOnly" style="display: none;">Now:</span>
                                <span data-product-price-without-tax="" class="price price--withoutTax">$${
                                  pr["variants"].length > 1
                                    ? pr["variants"][0][
                                        "calculated_price"
                                      ].toFixed(2)
                                    : pr["calculated_price"].toFixed(2)
                                }</span>
                              </div>
                          </div>
                          <p class="card-text card-text--extra" style="display: ${
                            pr["custom_fields"].find(
                              (field) => field["name"] === "__card-extra-info"
                            ) !== undefined
                              ? "relative;"
                              : "none;"
                          } "> 
                          ${
                            pr["custom_fields"].find(
                              (field) => field["name"] === "__card-extra-info"
                            ) !== undefined
                              ? pr["custom_fields"].find(
                                  (field) =>
                                    field["name"] === "__card-extra-info"
                                ).value
                              : ""
                          }</p>
                         <div class="card-action-wrapper">
                              ${actionSection}
                              <button type="button" onclick="window.location.href=${
                                pr["custom_url"]["url"]
                              }" 
                              class="button button--primary" >View Details</button>
                         </div>
                      </div>
                  </article>
              </div>
          </div>`;
      return template;
    }

    function customInsertionSort(arr, n) {
      let i, key, j;
      for (i = 1; i < n; i++) {
        key = arr[i]["total_sold"];
        j = i - 1;

        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j]["total_sold"] > key) {
          arr[j + 1]["total_sold"] = arr[j]["total_sold"];
          j = j - 1;
        }
        arr[j + 1]["total_sold"] = key;
      }
      return arr;
    }
  }

  configureIsotopeForAll() {
    // $(".grid").css("display", "grid");
    //   $(".lds-block").hide();
    let grid = document.getElementById("product-listing-all");
    const body = this;

    // for testing, comment this section and call the runImageTest()
    let iso;
    runIsotope();
    // if (this.checkMobile()) {
    //   runImageTest();
    // } else {
    //   $(".grid").css("display", "grid");
    //   $(".lds-block").hide();
    //   runIsotope();
    // }

    // runImageTest();

    // it will call runIsotope() if all images are loaded
    function runImageTest() {
      //   $(".grid").css("display", "grid");
      //   $(".lds-block").hide();

      let imgLoaded = true;

      let testImgInt = setInterval(() => {
        var cardImgs = document.querySelectorAll(
          "#grid-all-product .card-image"
        );
        if (cardImgs.length > 0) {
          for (var i = 0; i < cardImgs.length; i++) {
            var nonZero = true;
            if (cardImgs[i].offsetHeight < 100) {
              imgLoaded = false;
              nonZero = false;
              break;
            }
            if (nonZero) {
              imgLoaded = true;
            }
          }
        } else {
          imgLoaded = false;
        }

        if (imgLoaded) {
          clearInterval(testImgInt);
          runIsotope();
          // body.configureIsotopeForAll();
          // body.startGlobal();
          // $(".lds-block").hide();
        }
      }, 0);
    }

    function runIsotope() {
      // $(window).load(function () {
      // setTimeout(function () {

      iso = new Isotope(grid, {
        // options...
        itemSelector: ".product",
        layoutMode: "fitRows",

        getSortData: {
          name: function (itemElem) {
            return itemElem.getAttribute("data-name");
          },
          price: function (itemElem) {
            return Number(itemElem.getAttribute("data-product-price"));
          },
          review: function (itemElem) {
            return itemElem.getAttribute("data-rating");
          },
          best_selling: function (itemElem) {
            return Number(itemElem.getAttribute("data-best-selling"));
          },
          newest: function (itemElem) {
            return itemElem.getAttribute("data-date-created");
          },
          custom_sort_order: function (itemElem) {
            return Number(itemElem.getAttribute("data-custom-sort"));
          },
          custom_sort_num: function (itemElem) {
            return Number(itemElem.getAttribute("data-custom-num"));
          },
        },
      });
      // });
      // }, 0);

      $("#all-sort-select, #all-sort-select-mobile").change(function () {
        const val = $(this).val().split("-");

        if (val[0] === "review") {
          iso.arrange({
            sortBy: [val[0]],
            sortAscending: {
              review: false,
              // rating_count: false,
            },
          });
        } else {
          iso.arrange({
            sortBy: val[0],
            sortAscending: val[1] === "asc",
          });
        }
      });

      $("#all-sort-select, #all-sort-select-mobile").prop("disabled", false);

      setTimeout(function () {
        if (body.context.subcategories.length === 0) {
          iso.arrange({
            sortBy: "custom_sort_order",
            sortAscending: true,
          });
        } else {
          iso.arrange({
            sortBy: "custom_sort_num",
            sortAscending: true,
          });
        }
      }, 3);

      let resizeLayout = false;

      addEventListener("resize", (event) => {
        resizeLayout = true;
      });
      iso.on("layoutComplete", function () {
        if (resizeLayout) {
          resizeLayout = false;
          iso.arrange();
          return;
        }
        return;
      });
    }
  }
}
