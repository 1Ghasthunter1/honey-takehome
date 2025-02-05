"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Graph({
  data,
  width = 600,
  height = 400,
  xLabel = "X Axis",
  yLabel = "Y Axis",
}: {
  data: { x: number; y: number }[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Clear any existing SVG content
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .classed("bg-zinc-800/50", true)
      .classed("border", true)
      .classed("border-zinc-700", true)
      .classed("text-zinc-400", true)
      .classed("rounded-lg", true)
      .classed("overflow-visible", true)
      .classed("text-zinc-200", true)
      .append("g")
      .attr("transform", `translate(50, 20)`);

    const xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.x) ?? 0,
        d3.max(data, (d) => d.x) ?? 0
      ])
      .range([0, width - 100])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d.y) ?? 0,
        d3.max(data, (d) => d.y) ?? 0
      ])
      .range([height - 60, 0])
      .nice();

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 60})`)
      .call(xAxis);

    svg.append("g").call(yAxis);

    svg
      .append("text")
      .attr("x", (width - 100) / 2)
      .attr("y", height - 25)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .classed("fill-zinc-200", true)
      .text(xLabel);

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(height - 60) / 2)
      .attr("y", -35)
      .attr("text-anchor", "middle")
      .classed("fill-zinc-200", true)
      .style("font-size", "14px")
      .text(yLabel);

    // Add the line path first so it appears behind points
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveBasis);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add the points on top
    svg
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .style("fill", "#69b3a2")
      .style("stroke", "#fff")
      .style("stroke-width", "1px");
  }, [data, width, height, xLabel, yLabel]);

  return (
    <div className="flex justify-center items-center">
      <svg ref={ref}></svg>
    </div>
  );
}
