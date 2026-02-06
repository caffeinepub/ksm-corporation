import List "mo:core/List";

actor {
  type Category = {
    title : Text;
    description : Text;
    imageUrl : Text;
    id : Text;
  };

  type Config = {
    brandName : Text;
    heroHeadline : Text;
    heroDescription : Text;
    categories : [Category];
  };

  let categories = List.fromArray<Category>([
    {
      title = "Lifestyle";
      description = "Discover products that fit your lifestyle. From home decor to fitness gear, find everything you need to enhance your daily life.";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/2g3klKONcTUmYKGKIAEWaq/1a8f0a5e7e149a788ad3e7aae149bc58/avocado-bagels.jpg";
      id = "lifestyle";
    },
    {
      title = "NFTs";
      description = "Explore the world of digital art and collectibles. Our NFT category brings you unique digital assets verified on the blockchain.";
      imageUrl = "https://images.ctfassets.net/rk3vdgdr1eu6/3g3klKONcTUmYKGKIAEWaq/1a8f0a5e7e149a788ad3e7aae149bc58/avocado-bagels.jpg";
      id = "nfts";
    },
  ]);

  public shared ({ caller }) func getConfig() : async Config {
    {
      brandName = "Linden Storefront";
      heroHeadline = "Welcome to Linden Storefront";
      heroDescription = "Your one-stop shop for lifestyle products and digital collectibles.";
      categories = categories.toArray();
    };
  };
};
