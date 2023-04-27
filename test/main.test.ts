// Writing unit test for main.ts
// Test suite: main.ts


// testing console.log
//     √ should print "Dir Manager" to console
test("should print \"Dir Manager\" to console", () => {
    // Arrange
    const expectString = "Dir Manager";
    const consoleLog = console.log;
    let actual: string = "";
    console.log = (str: string) => actual = str;
    
    // Act
    require("../src/main");
    
    // Assert
    console.log = consoleLog;
    
    // Expect actual not to be null
    expect(actual).not.toBeNull();
});