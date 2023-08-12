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


  const insert = (value, nodeRoot = root) => {
    // insert value in current node
    if (nodeRoot === null) {
      nodeRoot = Node(value);
      // console.log('inserted!');
      return nodeRoot;
    }

    // recursion to search for node
    if (value < nodeRoot.data) {
      nodeRoot.left = insert(value, nodeRoot.left);
    } else if (value > nodeRoot.data) {
      nodeRoot.right = insert(value, nodeRoot.right);
    }

    return nodeRoot;
  };

  const deleteValue = (value, nodeRoot = root) => {
    // current node has no children
    if (nodeRoot === null) {
      return nodeRoot;
    }

    // recursion to search for the value to be deleted
    if (nodeRoot.data > value) {
      nodeRoot.left = deleteValue(value, nodeRoot.left);
      return nodeRoot;
    } else if (nodeRoot.data < value) {
      nodeRoot.right = deleteValue(value, nodeRoot.right);
      return nodeRoot;
    }

    // current node to be deleted
    // case when one child is empty
    if (nodeRoot.left === null) {
      let tempNode = nodeRoot.right;
      return tempNode;
    } else if (nodeRoot.right === null) {
      let tempNode = nodeRoot.left;
      return tempNode;
    }

    // case when node has both children
    else {
      let sucessorParent = nodeRoot;

      // find sucessor
      let sucessor = nodeRoot.right;
      while (sucessor.left !== null) {
        sucessorParent = sucessor;
        sucessor = sucessor.left;
      }

      // closest next number will always be left's right
      if (sucessorParent !== nodeRoot) {
        sucessorParent.left = sucessor.right;
      } else {
        sucessorParent.right = sucessor.right;
      }

      // copy sucessor data to root
      nodeRoot.data = sucessor.data;

      // return root
      return nodeRoot;
    }

  };

  const find = (value, nodeRoot = root) => {
    if (nodeRoot.data === value) {
      // console.log(nodeRoot);
      return prettyPrint(nodeRoot);
    }

    if (value < nodeRoot.data) {
      nodeRoot.left = find(value, nodeRoot.left);
      return nodeRoot;
    } else if (value > nodeRoot.data) {
      nodeRoot.right = find(value, nodeRoot.right);
      return nodeRoot;
    }
  };

  const levelOrder = (nodeRoot = root) => {
    if (nodeRoot === null) return;
 
    const queue = [];
    queue.push(nodeRoot);
    let result = '';

    while (queue.length !== 0) {
      // .shift() returns the first array's element
      let tempNode = queue.shift();
      result += `${tempNode.data}  `;

      // left child
      if (tempNode.left !== null) {
        queue.push(tempNode.left);
      }

      // right child
      if (tempNode.right !== null) {
        queue.push(tempNode.right);
      }
    }
    console.log(result);
    return result;
  };

  const inOrder = (nodeRoot = root) => {
    if (nodeRoot === null) return;

    

  /*   // left child first
    inOrder(nodeRoot.left);

    // visit node data
    let result = '';
    result += `${nodeRoot.data}`;

    // right child
    inOrder(nodeRoot.right);

    console.log(result);
    return result; */
  };

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
    insert,
    deleteValue,
    find,
    levelOrder,
    inOrder,
  };
};

const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const myTree = Tree(myArr);
// myTree.buildTree();
// myTree.showSorted();
myTree.insert(6);
// myTree.deleteValue(10);
myTree.prettyPrint();
// myTree.find(5);
// myTree.levelOrder();
myTree.inOrder();