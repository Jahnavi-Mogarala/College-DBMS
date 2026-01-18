// Load the JSON data
d3.json("departments.json").then(function (data) {

    // Set the dimensions and margins of the diagram
    var margin = { top: 20, right: 90, bottom: 30, left: 90 };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Append the SVG object to the tree container
    var svg = d3.select("#tree-container")
        .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Create a hierarchical structure with the data
    var root = d3.hierarchy(data);

    // Set the tree layout
    var treeLayout = d3.tree()
        .size([height, width]);

    // Assign positions to the nodes
    treeLayout(root);

    // Add links between the nodes
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(function (d) { return d.y; })
            .y(function (d) { return d.x; }));

    // Add nodes to the tree
    var node = svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", function (d) {
            return "node" +
                (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // Add circles to the nodes
    node.append("circle")
        .attr("r", 10)
        .attr("id", function(d) { return d.data.name.replace(/\s+/g, '-').toLowerCase(); });

    // Add labels to the nodes
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", function (d) { return d.children ? -13 : 13; })
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .text(function (d) { return d.data.name; });

});

  
