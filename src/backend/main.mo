import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Array "mo:core/Array";



actor {
  var nextProductId = 1;
  var nextOrderId = 1;

  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();

  type RegionStyle = {
    #american;
    #european;
    #italian;
    #australian;
    #canadian;
    #southAmerican;
  };

  let categories = List.fromArray<Category>([
    {
      title = "Men"; description = "Fashion and accessories for men"; imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/1mUilunwnb5RKRJtv1fk43/1d24fdf557c2bfbe1f116e575e0b57fe/mens.jpg?w=1920&q=50&fm=webp";
      id = "men";
    },
    {
      title = "Women";
      description = "Latest trends for women";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/4VnJ5Nd4PbZ4EphCYBWBI3/48e5b6e420e61d7df43cb3ad1b5dd9bf/womens.jpg?w=1920&q=50&fm=webp";
      id = "women";
    },
    {
      title = "Children";
      description = "Clothing for kids";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/43rczXctlv5o3kChhqjwac/260e99c999a157ac1cb41aae6c81db21/children.jpg?w=1920&q=50&fm=webp";
      id = "children";
    },
    {
      title = "Infants";
      description = "Fashion for babies";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/4ZX1JSOzWY7Cd3tcbifjVY/73894af05653a9dadc5eb8e616e774b4/infants.jpg?w=1920&q=50&fm=webp";
      id = "infants";
    },
    {
      title = "Jewelry";
      description = "Accessories for all occasions";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/BhECtGRqtUd7eZJ2TCeEr/50ea6fefbea4f2902a786adcead11480/jewelry.jpg?w=1920&q=50&fm=webp";
      id = "jewelry";
    },
    {
      title = "Shoes";
      description = "Footwear for everyone";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/7JSjphlLSNJyD7AcmJN9qw/28c42e3720c8828fee5f7b8dfeaa0a05/shoes.jpg?w=1920&q=50&fm=webp";
      id = "shoes";
    },
    {
      title = "Pets";
      description = "Pet fashion and accessories";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/1z7rFQf6d9GrzmlglTokLG/ac66e274b3d4bf0bdeb795c40be338f3/pets.jpg?w=1920&q=50&fm=webp";
      id = "pets";
    },
  ]);

  public type Product = {
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

  public type OrderLineItem = {
    productId : Text;
    quantity : Nat;
    size : ?Text;
    color : ?Text;
  };

  public type Order = {
    id : Text;
    buyerName : Text;
    buyerEmail : Text;
    shippingAddress : Text;
    lineItems : [OrderLineItem];
    totalAmount : Nat;
    currency : Text;
    timestamp : Time.Time;
  };

  public type Category = {
    title : Text;
    description : Text;
    imageUrl : Text;
    id : Text;
  };

  public type Config = {
    brandName : Text;
    heroHeadline : Text;
    heroDescription : Text;
    categories : [Category];
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

  public shared ({ caller }) func getConfig() : async Config {
    {
      brandName = "Linden Storefront";
      heroHeadline = "Clothing for every occasion";
      heroDescription = "Discover our latest collection of men's, women's, and children's clothing. Shop now and enjoy free delivery in Europe for orders above 100€.";
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

  public query ({ caller }) func getProduct(productId : Text) : async ?Product {
    products.get(productId);
  };

  public shared ({ caller }) func placeOrder(
    buyerName : Text,
    buyerEmail : Text,
    shippingAddress : Text,
    lineItems : [OrderLineItem],
    currency : Text,
  ) : async Text {
    let orderId = nextOrderId.toText();
    let totalAmount = 0;
    let order : Order = {
      id = orderId;
      buyerName;
      buyerEmail;
      shippingAddress;
      lineItems;
      totalAmount;
      currency;
      timestamp = Time.now();
    };
    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getOrder(orderId : Text) : async ?Order {
    orders.get(orderId);
  };

  public query ({ caller }) func getAllOrders() : async [(Text, Order)] {
    orders.toArray();
  };
};
