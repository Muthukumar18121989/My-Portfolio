// Fictional request data — no real McKinsey names, clients, or content.
// Same request IDs are reused across screens so the before/after pairs read
// as the same underlying data moving through two different interfaces.
export const DUMMY_REQUESTS = [
  {
    id: "PRD-20841",
    requestor: "R. Coleman",
    title: "Q3 Client Steering Committee Deck",
    deadline: "18-Nov 17:00",
    priority: "High",
    status: "New",
  },
  {
    id: "PRD-20842",
    requestor: "T. Whitfield",
    title: "Market Entry Strategy — APAC",
    deadline: "19-Nov 09:00",
    priority: "Medium",
    status: "New",
  },
  {
    id: "PRD-20843",
    requestor: "A. Marsh",
    title: "Org Design Workshop Slides",
    deadline: "19-Nov 12:00",
    priority: "Low",
    status: "In Progress",
  },
  {
    id: "PRD-20844",
    requestor: "D. Okafor",
    title: "Due Diligence Summary v4",
    deadline: "20-Nov 10:00",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "PRD-20845",
    requestor: "L. Bianchi",
    title: "Board Readout Template",
    deadline: "20-Nov 15:00",
    priority: "Medium",
    status: "Pending Review",
  },
] as const;

const cell = "border border-[#a0a0a0] px-1.5 py-1 text-left";

function LegacyInbox() {
  return (
    <div>
      <div className="mb-1.5 flex gap-3">
        <span className="border border-[#a0a0a0] bg-[#f5f4ee] px-2 py-0.5">Filter: All Open</span>
        <span className="border border-[#a0a0a0] bg-[#f5f4ee] px-2 py-0.5">Sort: Deadline ▾</span>
      </div>
      <table className="w-full border-collapse" style={{ fontSize: "10.5px" }}>
        <thead>
          <tr className="bg-[#0a2f6e] text-white">
            <th className={cell}>Req ID</th>
            <th className={cell}>Requestor</th>
            <th className={cell}>PPT Title</th>
            <th className={cell}>Deadline</th>
            <th className={cell}>Priority</th>
            <th className={cell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {DUMMY_REQUESTS.map((r, i) => (
            <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-[#eef1f7]"}>
              <td className={cell}>{r.id}</td>
              <td className={cell}>{r.requestor}</td>
              <td className={cell}>{r.title}</td>
              <td className={cell}>{r.deadline}</td>
              <td className={cell}>{r.priority}</td>
              <td className={cell}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegacyAssignment() {
  const row = "mb-1.5 flex items-center gap-2";
  const label = "w-28 shrink-0 text-black";
  const input = "flex-1 border border-[#8a8a8a] bg-white px-1 py-0.5";
  return (
    <div style={{ fontSize: "10.5px" }}>
      <p className="mb-2 font-bold">Assign Request — PRD-20841</p>
      <div className={row}>
        <span className={label}>Requestor:</span>
        <span className={input}>R. Coleman</span>
      </div>
      <div className={row}>
        <span className={label}>Deadline:</span>
        <span className={input}>18-Nov-2013 17:00</span>
      </div>
      <div className={row}>
        <span className={label}>Priority:</span>
        <span className={input}>High ▾</span>
      </div>
      <div className={row}>
        <span className={label}>Assign To:</span>
        <span className={input}>-- Select VA -- ▾</span>
      </div>
      <div className="mb-2 flex items-start gap-2">
        <span className={label}>Notes:</span>
        <span className="h-12 flex-1 border border-[#8a8a8a] bg-white px-1 py-0.5">
          Client-facing deck, please prioritize brand template v9.
        </span>
      </div>
      <span
        className="inline-block border border-[#a0a0a0] bg-[#f5f4ee] px-3 py-1"
        style={{ boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #8a8a8a" }}
      >
        Submit
      </span>
    </div>
  );
}

function LegacyTaskDetail() {
  return (
    <div style={{ fontSize: "10.5px" }}>
      <p className="mb-2 font-bold">Request Detail — PRD-20844</p>
      <table className="mb-2 w-full border-collapse">
        <tbody>
          {[
            ["Requestor", "D. Okafor"],
            ["Title", "Due Diligence Summary v4"],
            ["Deadline", "20-Nov-2013 10:00"],
            ["Priority", "High"],
            ["Assigned VA", "K. Ibrahim"],
            ["Status", "In Progress"],
          ].map(([k, v]) => (
            <tr key={k}>
              <td className={`${cell} w-28 bg-[#ece9d8] font-bold`}>{k}</td>
              <td className={cell}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mb-1 font-bold">Communication History</p>
      <table className="w-full border-collapse">
        <tbody>
          {[
            ["19-Nov 08:12", "K. Ibrahim", "Started build from v3 template."],
            ["19-Nov 11:40", "D. Okafor", "Please update slide 4 chart per attached."],
            ["19-Nov 13:05", "K. Ibrahim", "Updated, awaiting further comments."],
          ].map(([ts, who, note], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#eef1f7]"}>
              <td className={`${cell} whitespace-nowrap`}>{ts}</td>
              <td className={`${cell} whitespace-nowrap`}>{who}</td>
              <td className={cell}>{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegacyStatusUpdate() {
  return (
    <div style={{ fontSize: "10.5px" }}>
      <p className="mb-2 font-bold">Update Status — PRD-20843</p>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="w-28 shrink-0">Current Status:</span>
        <span className="border border-[#8a8a8a] bg-white px-1 py-0.5">In Progress ▾</span>
      </div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="w-28 shrink-0">New Status:</span>
        <span className="border border-[#8a8a8a] bg-white px-1 py-0.5">Pending Review ▾</span>
      </div>
      <div className="mb-2 flex items-start gap-2">
        <span className="w-28 shrink-0">Comment:</span>
        <span className="h-10 flex-1 border border-[#8a8a8a] bg-white px-1 py-0.5">
          First draft complete, routed to requestor for sign-off.
        </span>
      </div>
      <span
        className="inline-block border border-[#a0a0a0] bg-[#f5f4ee] px-3 py-1"
        style={{ boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #8a8a8a" }}
      >
        Update
      </span>
      <p className="mt-3 mb-1 font-bold">Status Log</p>
      <table className="w-full border-collapse">
        <tbody>
          {[
            ["18-Nov 09:00", "New → In Progress", "A. Marsh"],
            ["19-Nov 12:00", "In Progress → Pending Review", "A. Marsh"],
          ].map(([ts, change, who], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#eef1f7]"}>
              <td className={`${cell} whitespace-nowrap`}>{ts}</td>
              <td className={cell}>{change}</td>
              <td className={`${cell} whitespace-nowrap`}>{who}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegacyDelivery() {
  return (
    <div style={{ fontSize: "10.5px" }}>
      <p className="mb-2 font-bold">Delivery Confirmation — PRD-20845</p>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="w-32 shrink-0">Final File:</span>
        <span className="border border-[#8a8a8a] bg-white px-1 py-0.5">
          Board_Readout_Template_FINAL.pptx
        </span>
      </div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="w-32 shrink-0">Delivery Email:</span>
        <span className="border border-[#8a8a8a] bg-white px-1 py-0.5">
          l.bianchi@client-domain.com
        </span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <span className="w-32 shrink-0">Close Request:</span>
        <span>
          <input type="checkbox" checked readOnly /> Confirm delivered &amp; close
        </span>
      </div>
      <span
        className="inline-block border border-[#a0a0a0] bg-[#f5f4ee] px-3 py-1"
        style={{ boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #8a8a8a" }}
      >
        Send &amp; Close
      </span>
    </div>
  );
}

export { LegacyInbox, LegacyAssignment, LegacyTaskDetail, LegacyStatusUpdate, LegacyDelivery };
