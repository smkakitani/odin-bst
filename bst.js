#!/usr/bin/env node
console.log('hello world');

const Node = (data = null, left = null, right = null) => {
  return {
    data,
    left,
    right
  };
};

const Tree = (array) => {
  // remove duplicated and sort array
  let sortedArray = [...new Set(array)].sort((a, b) => a - b);
  
  const showSorted= ()  => {
    console.log(sortedArray);
    return sortedArray;
  };

  const buildTree = (arr, start, end) => {
    if (start > end) {
      return null;
    }

    // find the middle element index
    const midIndex = parseInt((start + end) / 2);

    // create node  with middle element
    const node = Node(arr[midIndex]);

    // left and right of node
    node.left = buildTree(arr, start, midIndex - 1);
    node.right = buildTree(arr, midIndex + 1, end);

    // console.log(node.data);
    return node;
  };

  let root = null;
  const n = sortedArray.length;
  root = buildTree(sortedArray, 0, n - 1);

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

  return {
    buildTree,
    showSorted,
    prettyPrint,
  };
};

const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = Tree(myArr);
// myTree.buildTree();
// myTree.showSorted();
myTree.prettyPrint();
// console.log(myTree.showSorted());
// console.log(myTree.sortArray(myArr));