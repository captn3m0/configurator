describe("Configurator", function() {
  var config=Configurator(
    {
      a:12,
      b:2
    }
    ,['b']
  );

  it("should initialize with default values", function() {
    expect(config.get('a')).toBe(12);
    expect(config.get('b')).toBe(2);
  });

  it("should set nested values",function(){
  	config.set("x.b.c.d",123);
  	expect(config.get("x.b.c.d")).toBe(123);
  });

  it("should persist values after clearing localStorage",function(){
  	config.clearLS();
  	expect(config.get("b")).toBe(2);
  });

  it("should add persistent keys", function(){
  	config.set("c",3,true);
  	config.clearLS();
  	expect(config.get("c")).toBe(3);
  });

});
