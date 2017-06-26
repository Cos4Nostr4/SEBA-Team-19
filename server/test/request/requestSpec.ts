import { suite, test, slow, timeout } from "mocha-typescript";
import assert = require('assert');

@suite class Hello {
    @test world() {
        assert.equal(1, 2, "Expected one to equal two.");
    }
}