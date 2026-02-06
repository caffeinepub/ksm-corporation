import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";

actor {
  type RegionStyle = {
    #american;
    #european;
    #italian;
    #australian;
    #canadian;
    #southAmerican;
  };

  type Category = {
    id : Text;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    currency : Text;
    categoryId : Text;
    imageUrl : Text;
    sizes : [Text];
    colors : [Text];
    inStock : Bool;
    stockCount : Nat;
    styleTags : [RegionStyle];
  };

  type OrderLineItem = {
    productId : Text;
    quantity : Nat;
    size : ?Text;
    color : ?Text;
  };

  type Order = {
    id : Text;
    buyerName : Text;
    buyerEmail : Text;
    shippingAddress : Text;
    lineItems : [OrderLineItem];
    totalAmount : Nat;
    currency : Text;
    timestamp : Time.Time;
  };

  type Config = {
    brandName : Text;
    heroHeadline : Text;
    heroDescription : Text;
    categories : [Category];
  };

  var nextProductId = 1;
  var nextOrderId = 1;

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();

  let categories = List.fromArray<Category>([
    // Hardcoded with stable ids for consistency across requests and upgrades
    {
      id = "womens-clothing";
      title = "Women’s Clothing";
      description = "Modern styles and timeless classics for women.";
      imageUrl = "/assets/images/women.jpg";
    },
    {
      id = "mens-clothing";
      title = "Men’s Clothing";
      description = "Fashionable and functional apparel for men.";
      imageUrl = "/assets/images/men.jpg";
    },
    {
      id = "childrens-clothing";
      title = "Children’s Clothing";
      description = "Fun, durable clothing for kids of all ages.";
      imageUrl = "/assets/images/children.jpg";
    },
    {
      id = "infant-clothing";
      title = "Infant Clothing";
      description = "Soft, safe clothing for newborns and babies.";
      imageUrl = "/assets/images/infants.jpg";
    },
    {
      id = "shoes";
      title = "Shoes";
      description = "Footwear for every occasion and season.";
      imageUrl = "/assets/images/shoes.jpg";
    },
    {
      id = "jewelry";
      title = "Jewelry";
      description = "Elegant and trendy jewelry and accessories.";
      imageUrl = "/assets/images/jewelry.jpg";
    },
    {
      id = "accessories";
      title = "Accessories";
      description = "Handbags, wallets, scarves, and more";
      imageUrl = "/assets/images/accessories.jpg";
    },
    {
      id = "bags";
      title = "Bags";
      description = "Totes, crossbody bags, backpacks, and luggage";
      imageUrl = "/assets/images/bags.jpg";
    },
  ]);

  public shared ({ caller }) func getConfig() : async Config {
    {
      brandName = "Linden-Storefront";
      heroHeadline = "Explore the Latest Fashion";
      heroDescription = "Clothing essentials for women, men, and children, plus accessories and jewelry. Shop high-quality shoes and bags and enjoy convenient buying experience.";
      categories = categories.toArray();
    };
  };

  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    price : Nat,
    currency : Text,
    categoryId : Text,
    imageUrl : Text,
    sizes : [Text],
    colors : [Text],
    stockCount : Nat,
    styleTags : [RegionStyle],
  ) : async Text {
    let productId = nextProductId.toText();
    let product : Product = {
      id = productId;
      name;
      description;
      price;
      currency;
      categoryId;
      imageUrl;
      sizes;
      colors;
      inStock = stockCount > 0;
      stockCount;
      styleTags;
    };
    products.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getProductsByCategory(categoryId : Text) : async [Product] {
    let filteredProducts = products.filter(
      func(_id, product) { product.categoryId == categoryId }
    );
    let iter = filteredProducts.values();
    iter.toArray();
  };

  public query ({ caller }) func getProductsByStyle(styleFilter : RegionStyle) : async [Product] {
    let filteredProducts = products.filter(
      func(_id, product) {
        product.styleTags.find(
          func(style) {
            style == styleFilter;
          }
        ) != null;
      }
    );
    let iter = filteredProducts.values();
    iter.toArray();
  };

  public query ({ caller }) func getProduct(productId : Text) : async ?Product {
    products.get(productId);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let iter = products.values();
    iter.toArray();
  };

  public shared ({ caller }) func placeOrder(
    buyerName : Text,
    buyerEmail : Text,
    shippingAddress : Text,
    lineItems : [OrderLineItem],
    currency : Text,
  ) : async Text {
    var totalAmount = 0;
    let validatedLineItems : List.List<OrderLineItem> = List.empty<OrderLineItem>();

    // Validate each line item before looping to compute total
    for (item in lineItems.values()) {
      switch (products.get(item.productId)) {
        case (null) { assert false };
        case (?product) {
          assert item.quantity > 0;
          assert item.quantity <= product.stockCount;
          totalAmount += product.price * item.quantity;
          validatedLineItems.add(item);
        };
      };
    };

    let orderId = nextOrderId.toText();
    let order : Order = {
      id = orderId;
      buyerName;
      buyerEmail;
      shippingAddress;
      lineItems = validatedLineItems.toArray();
      totalAmount;
      currency;
      timestamp = Time.now();
    };

    // Persist order
    orders.add(orderId, order);
    nextOrderId += 1;

    // Update stock for purchased products
    for (item in lineItems.values()) {
      switch (products.get(item.productId)) {
        case (null) { () };
        case (?product) {
          let newStock = product.stockCount - item.quantity;
          let updatedProduct : Product = {
            product with
            stockCount = newStock;
            inStock = newStock > 0;
          };
          products.add(item.productId, updatedProduct);
        };
      };
    };

    orderId;
  };
};
