describe("Configurator", function() {
  var config=Configurator({a:1,b:2},['b']);

  it("should initialize with default values", function() {
    expect(config.get('a')).toBe(1);
    expect(config.get('b')).toBe(2);
  });

  it("should set nested values",function(){
  	config.set("a.b",true);
  	expect(config.get("a.b")).toBe(true);
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
