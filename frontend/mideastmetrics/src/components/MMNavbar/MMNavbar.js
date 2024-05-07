import MMLogo from "../../assets/mideastmetricslogo.png";

function MMNavbar() {
  return (
    <div className="bg-stone-900/70">
      <div className="flex justify-between tracking-widest text-white font-serif font-extrabold">
        <div className="flex items-center justify-center flex-grow">
          <h1>MIDEAST</h1>
          <img
            src={MMLogo}
            className="w-24"
          />
          <h1>METRICS</h1>
        </div>
      </div>
    </div>
  );
}


export default MMNavbar;